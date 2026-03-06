import { Router } from "express";
import {
  createChallenge,
  getChallenges,
  getChallengeById,
} from "../controllers/challengesController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.post("/", protectRoute, createChallenge);
router.get("/", getChallenges);
router.get("/:id", getChallengeById);

export default router;
