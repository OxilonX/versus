import { prisma } from "../lib/prisma.js";
export const createItem = async (req, res) => {
    try {
        const { name, imageUrl, isPublic } = req.body;
        const user = req.user;
        if (!user?.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (!name) {
            return res.status(400).json({ error: "Item name is required" });
        }
        const finalImageUrl = !imageUrl || imageUrl.trim() === "" || !isValidUrl(imageUrl)
            ? "/images/default_item_v1.jpeg"
            : imageUrl;
        function isValidUrl(url) {
            try {
                new URL(url);
                return true;
            }
            catch {
                return false;
            }
        }
        const newItem = await prisma.item.create({
            data: {
                name,
                imageUrl: finalImageUrl,
                isPublic: isPublic ?? true,
                user: { connect: { id: user.id } },
            },
        });
        res.status(201).json(newItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create item" });
    }
};
export const getPublicItems = async (req, res) => {
    try {
        const items = await prisma.item.findMany({
            where: { isPublic: true },
        });
        res.json(items);
    }
    catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Failed to fetch items" });
    }
};
export const getPrivateItems = async (req, res) => {
    try {
        const user = req.user;
        if (!user?.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const items = await prisma.item.findMany({
            where: { AND: [{ userId: user.id }, { isPublic: false }] },
        });
        res.json(items);
    }
    catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Failed to fetch items" });
    }
};
export const voteItemChallenge = async (req, res) => {
    try {
        const { challengeId } = req.params;
        const { itemId } = req.body;
        const user = req.user;
        if (!user?.id)
            return res.status(401).json({ error: "Unauthorized" });
        const existingVote = await prisma.vote.findUnique({
            where: {
                userId_challengeId: {
                    userId: user.id,
                    challengeId,
                },
            },
        });
        if (existingVote && existingVote.itemId === itemId) {
            await prisma.vote.delete({
                where: { id: existingVote.id },
            });
            return res.json({ message: "Vote removed", status: "neutral" });
        }
        const vote = await prisma.vote.upsert({
            where: {
                userId_challengeId: {
                    userId: user.id,
                    challengeId,
                },
            },
            update: { itemId, challengeItemChallengeId: challengeId, challengeItemItemId: itemId },
            create: {
                userId: user.id,
                challengeId,
                itemId,
                challengeItemChallengeId: challengeId,
                challengeItemItemId: itemId,
            },
        });
        return res.status(201).json({
            message: existingVote ? "Vote switched" : "Vote added",
            status: "voted",
            itemId: vote.itemId,
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
//# sourceMappingURL=itemsControllers.js.map