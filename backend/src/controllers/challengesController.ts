import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";
export const createChallenge = async (req: Request, res: Response) => {
  try {
    const { title, items } = req.body;
    const user = req.user;

    if (!user?.id) return res.status(401).json({ error: "User ID missing" });
    if (!title) return res.status(400).json({ error: "Title is required" });
    if (!items || items.length !== 2) {
      return res.status(400).json({ error: "Exactly 2 items are required" });
    }

    const challenge = await prisma.challenge.create({
      data: {
        title,
        user: { connect: { id: user.id } },
        items: {
          create: items.map((item: { itemId: string }) => ({
            item: { connect: { id: item.itemId } },
          })),
        },
      },
      include: {
        items: {
          include: { item: true },
        },
      },
    });

    res.status(201).json(challenge);
  } catch (error: any) {
    console.error("Prisma Error:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "One or more Item IDs not found" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getChallenges = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user?.id;
    const challenges = await prisma.challenge.findMany({
      select: {
        id: true,
        title: true,
        userId: true,
        createdAt: true,
        user: {
          select: {
            image: true,
            name: true,
          },
        },
        items: {
          select: {
            itemId: true,
            item: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
          },
        },
        _count: {
          select: { like: true },
        },
        like: {
          where: { userId: currentUserId || "guest" },
          select: { userId: true },
        },
      },
    });
    const results = challenges.map((challenge) => {
      return {
        ...challenge,
        isLiked: challenge.like.length > 0,
        likesCount: challenge._count.like,
      };
    });
    res.json(results);
  } catch (error) {
    console.error("Error fetching Challenges:", error);
    res.status(500).json({ error: "Failed to fetch Challenges" });
  }
};

export const getChallengeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const challenges = await prisma.challenge.findUnique({
      where: { id: id as string },
    });

    if (!challenges) {
      res.status(404).json({ error: "Challenge not found" });
      return;
    }

    res.json(challenges);
  } catch (error) {
    console.error("Error fetching Challenges:", error);
    res.status(500).json({ error: "Failed to fetch Challenges" });
  }
};
export const likeChallenge = async (req: Request, res: Response) => {
  try {
    const { challengeId } = req.params as { challengeId: string };
    const user = req.user;

    if (!user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const isLiked = await prisma.like.findUnique({
      where: {
        userId_challengeId: {
          userId: user.id,
          challengeId: challengeId,
        },
      },
    });

    if (isLiked) {
      await prisma.like.delete({
        where: {
          userId_challengeId: {
            userId: user.id,
            challengeId: challengeId,
          },
        },
      });
      return res.json({ message: "Like removed", status: "unliked" });
    }

    await prisma.like.create({
      data: {
        userId: user.id,
        challengeId: challengeId,
      },
    });

    return res.status(201).json({ message: "Like added", status: "liked" });
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
