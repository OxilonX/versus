import { User } from "better-auth";
import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users :", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUsersById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: id as string },
    });

    if (!user) {
      res.status(404).json({ error: "user not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching User:", error);
    res.status(500).json({ error: "Failed to fetch User" });
  }
};
