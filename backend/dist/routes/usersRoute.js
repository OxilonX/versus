import { Router } from "express";
import { getUsers, getUsersById, getUserProfile } from "../controllers/usersControllers";
import { optionalAuth } from "../middleware/protectRoute.js";
const router = Router();
router.get("/", getUsers);
router.get("/:id", getUsersById);
router.get("/profile/:id", optionalAuth, getUserProfile);
export default router;
//# sourceMappingURL=usersRoute.js.map