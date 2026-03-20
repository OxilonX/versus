import { Router } from "express";
import { getUsers, getUsersById, getUserProfile } from "../controllers/usersControllers.js";
import { optionalAuth } from "../middleware/protectRoute.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUsersById);
router.get("/profile/:id", optionalAuth, getUserProfile);

export default router;
