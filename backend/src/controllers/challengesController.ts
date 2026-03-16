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
    const { sort, search } = req.query;

    const whereClause = search
      ? {
          OR: [
            { title: { contains: search as string, mode: "insensitive" as const } },
            { user: { name: { contains: search as string, mode: "insensitive" as const } } },
          ],
        }
      : {};

    let orderBy: any = { createdAt: "desc" };
    if (sort === "votes") {
      orderBy = {
        votes: { _count: "desc" },
      };
    } else if (sort === "likes") {
      orderBy = {
        like: { _count: "desc" },
      };
    }

    const challenges = await prisma.challenge.findMany({
      take: 20,
      skip: 0,
      where: whereClause,
      orderBy,
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
          orderBy: {
            itemId: "asc",
          },
          select: {
            itemId: true,
            item: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
            _count: {
              select: {
                votes: true,
              },
            },
          },
        },
        _count: {
          select: {
            like: true,
          },
        },
        like: {
          where: { userId: currentUserId },
          select: { userId: true },
        },
        votes: {
          where: { userId: currentUserId },
          select: { itemId: true },
        },
      },
    });
    const results = challenges.map((c) => {
      const item1Votes = c.items[0]?._count.votes || 0;
      const item2Votes = c.items[1]?._count.votes || 0;
      const totalVotes = item1Votes + item2Votes;

      return {
        ...c,
        isLiked: c.like.length > 0,
        likesCount: c._count.like,
        userVotedItemId: c.votes[0]?.itemId || null,
        stats: {
          item1Percent:
            totalVotes > 0 ? Math.round((item1Votes / totalVotes) * 100) : 0,
          item2Percent:
            totalVotes > 0 ? Math.round((item2Votes / totalVotes) * 100) : 0,
          totalVotes,
        },
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
