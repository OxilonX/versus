import { Router } from "express";
import {
  createItem,
  getPublicItems,
  getPrivateItems,
} from "../controllers/itemsControllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.post("/", protectRoute, createItem);
router.get("/", getPublicItems);
router.get("/private", protectRoute, getPrivateItems);
router.get("/:id");

export default router;
