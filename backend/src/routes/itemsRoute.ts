import { Router } from "express";
import {
  createItem,
  getPublicItems,
  getPrivateItems,
  voteItemChallenge,
  deleteItem,
} from "../controllers/itemsControllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.delete("/:itemId", protectRoute, deleteItem);
router.post("/", protectRoute, createItem);
router.get("/", getPublicItems);
router.get("/private", protectRoute, getPrivateItems);
router.get("/:id");
router.post("/:challengeId", protectRoute, voteItemChallenge);

export default router;
