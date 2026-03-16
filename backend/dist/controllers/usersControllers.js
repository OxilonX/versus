import { prisma } from "../lib/prisma.js";
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users :", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
export const getUsersById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        if (!user) {
            res.status(404).json({ error: "user not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        console.error("Error fetching User:", error);
        res.status(500).json({ error: "Failed to fetch User" });
    }
};
export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUserId = req.user?.id;
        const user = await prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                name: true,
                image: true,
                createdAt: true,
            },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const [challengesCount, likesCount, votesAgg, createdChallenges, votedChallenges] = await Promise.all([
            prisma.challenge.count({
                where: { userId: id },
            }),
            prisma.like.count({
                where: { challenge: { userId: id } },
            }),
            prisma.vote.aggregate({
                where: { challenge: { userId: id } },
                _count: true,
            }),
            prisma.challenge.findMany({
                where: { userId: id },
                take: 20,
                orderBy: { createdAt: "desc" },
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
                    _count: {
                        select: { like: true },
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
            }),
            prisma.challenge.findMany({
                where: {
                    votes: {
                        some: { userId: id },
                    },
                },
                take: 20,
                orderBy: { createdAt: "desc" },
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
                    _count: {
                        select: { like: true },
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
            }),
        ]);
        const formatChallenge = (c) => {
            const item1Votes = c.items[0]?._count.votes || 0;
            const item2Votes = c.items[1]?._count.votes || 0;
            const totalVotes = item1Votes + item2Votes;
            return {
                ...c,
                isLiked: c.like.length > 0,
                likesCount: c._count.like,
                userVotedItemId: c.votes[0]?.itemId || null,
                stats: {
                    item1Percent: totalVotes > 0 ? Math.round((item1Votes / totalVotes) * 100) : 0,
                    item2Percent: totalVotes > 0 ? Math.round((item2Votes / totalVotes) * 100) : 0,
                    totalVotes,
                },
            };
        };
        res.json({
            user: {
                id: user.id,
                name: user.name,
                image: user.image,
                createdAt: user.createdAt,
            },
            stats: {
                challengesCount,
                likesCount,
                votesCount: votesAgg._count,
            },
            createdChallenges: createdChallenges.map(formatChallenge),
            votedChallenges: votedChallenges.map(formatChallenge),
        });
    }
    catch (error) {
        console.error("Error fetching User Profile:", error);
        res.status(500).json({ error: "Failed to fetch User Profile" });
    }
};
//# sourceMappingURL=usersControllers.js.map