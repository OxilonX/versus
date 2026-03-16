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
//# sourceMappingURL=usersControllers.js.map