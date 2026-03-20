import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";
interface MappedChallenge {
  saves?: { userId: string }[];
  like?: { userId: string }[];
  votes?: { itemId: string }[];
  items: any[];
  _count: { like: number };
}
const isValidCuid = (str: string): boolean => {
  return /^c[a-z0-9]{24}$/.test(str);
};
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

    const isCuid = isValidCuid(search as string);

    const whereClause = isCuid
      ? { id: search as string }
      : search
        ? {
            OR: [
              {
                title: {
                  contains: search as string,
                  mode: "insensitive" as const,
                },
              },
              {
                user: {
                  name: {
                    contains: search as string,
                    mode: "insensitive" as const,
                  },
                },
              },
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
        saves: {
          where: { userId: currentUserId },
          select: { userId: true },
        },
      },
    });
    const results = (challenges as unknown as MappedChallenge[]).map((c) => {
      const item1Votes = c.items[0]?._count.votes || 0;
      const item2Votes = c.items[1]?._count.votes || 0;
      const totalVotes = item1Votes + item2Votes;

      return {
        ...c,
        isLiked: (c.like?.length ?? 0) > 0,
        isSaved: (c.saves?.length ?? 0) > 0,
        likesCount: c._count.like,
        userVotedItemId: c.votes?.[0]?.itemId || null,
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
    const currentUserId = req.user?.id;
    const { challengeId } = req.params;

    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId as string },

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
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }
    const item1Votes = challenge.items[0]?._count.votes || 0;
    const item2Votes = challenge.items[1]?._count.votes || 0;
    const totalVotes = item1Votes + item2Votes;
    const results = {
      ...challenge,
      isLiked: challenge.like.length > 0,
      likesCount: challenge._count.like,
      userVotedItemId: challenge.votes[0]?.itemId || null,
      stats: {
        item1Percent:
          totalVotes > 0 ? Math.round((item1Votes / totalVotes) * 100) : 0,
        item2Percent:
          totalVotes > 0 ? Math.round((item2Votes / totalVotes) * 100) : 0,
        totalVotes,
      },
    };

    res.json([results]);
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
export const deleteChallenge = async (req: Request, res: Response) => {
  try {
    const { challengeId } = req.params as { challengeId: string };
    const user = req.user;

    if (!user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!challengeId) {
      return res.status(400).json({ error: "Challenge ID is required" });
    }
    const deletedChallenge = await prisma.challenge.delete({
      where: { id: challengeId, userId: user?.id },
    });
    res.status(203).json({ message: "Challenge deleted successfuly" });
  } catch (err) {
    res.status(401).json({ error: "Failed to delete the challenge" });
  }
};
export const reportChallenge = async (req: Request, res: Response) => {
  try {
    const challengeId = req.params?.challengeId as string;
    const { reason } = req.body;
    const user = req.user;

    if (!user?.id) return res.status(401).json({ error: "User ID missing" });
    if (!reason) return res.status(400).json({ error: "Reason is required" });
    const report = await prisma.report.create({
      data: {
        reason,
        user: { connect: { id: user.id } },
        challenge: { connect: { id: challengeId } },
      },
    });
    if (report)
      res.status(201).json({ message: "the report is sent successfuly" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const saveChallenge = async (req: Request, res: Response) => {
  try {
    const challengeId = req.params?.challengeId as string;
    const user = req.user;

    if (!user?.id) return res.status(401).json({ error: "Unauthorized" });
    if (!challengeId)
      return res.status(400).json({ error: "Challenge ID is required" });

    const existingSave = await prisma.save.findUnique({
      where: {
        userId_challengeId: {
          userId: user.id,
          challengeId: challengeId,
        },
      },
    });

    if (existingSave) {
      const remove = await prisma.save.delete({
        where: {
          userId_challengeId: {
            userId: user.id,
            challengeId: challengeId,
          },
        },
      });
      return res.status(200).json({
        message: "The Challenge is unsaved successfuly",
        remove,
        isSaved: false,
      });
    }

    const save = await prisma.save.create({
      data: {
        userId: user.id,
        challengeId: challengeId,
      },
    });

    return res.status(201).json({
      message: "Challenge added to saves successfully",
      isSaved: true,
      save,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Challenge not found" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getSavedChallenges = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user?.id;

    if (!currentUserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const savedRecords = await prisma.save.findMany({
      where: { userId: currentUserId },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
            userId: true,
            createdAt: true,
            items: {
              orderBy: { itemId: "asc" },
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
                  select: { votes: true },
                },
              },
            },
            votes: {
              where: { userId: currentUserId },
              select: { itemId: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const results = savedRecords.map((record) => {
      const challenge = record.challenge;
      const item1Votes = challenge.items[0]?._count.votes || 0;
      const item2Votes = challenge.items[1]?._count.votes || 0;
      const totalVotes = item1Votes + item2Votes;

      return {
        ...challenge,
        userVotedItemId: challenge.votes[0]?.itemId || null,
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
    console.error("Error fetching Saved Challenges:", error);
    res.status(500).json({ error: "Failed to fetch Saved Challenges" });
  }
};
