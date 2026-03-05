import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, published = false } = req.body;

    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { published } = req.query;

    const where =
      published !== undefined ? { published: published === "true" } : {};

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: id as string },
    });

    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};
