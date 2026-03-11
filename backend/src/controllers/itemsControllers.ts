import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";
export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, imageUrl, isPublic } = req.body;
    const user = req.user;
    if (!user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!name) {
      return res.status(400).json({ error: "Item name is required" });
    }

    const newItem = await prisma.item.create({
      data: {
        name,
        imageUrl: imageUrl || "image.example.com",
        isPublic: isPublic ?? true,
        user: { connect: { id: user.id } },
      },
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create item" });
  }
};
export const getPublicItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany({
      where: { isPublic: true },
    });
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
};
export const getPrivateItems = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const items = await prisma.item.findMany({
      where: { AND: [{ userId: user.id }, { isPublic: false }] },
    });
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
};
