import { Router } from "express";
import { getUsers, getUsersById } from "../controllers/usersControllers";
const router = Router();
router.get("/", getUsers);
router.get("/:id", getUsersById);
export default router;
//# sourceMappingURL=usersRoute.js.map