import { Router } from "express";
import { createItem, getItems } from "../controllers/itemsControllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.post("/", protectRoute, createItem);
router.get("/", getItems);
router.get("/:id");

export default router;
