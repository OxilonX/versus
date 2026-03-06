import { User } from "better-auth";
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
    const challenges = await prisma.challenge.findMany();
    res.json(challenges);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const getChallengeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const challenges = await prisma.challenge.findUnique({
      where: { id: id as string },
    });

    if (!challenges) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.json(challenges);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};
