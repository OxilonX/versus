import { Router } from "express";
import {
  createChallenge,
  getChallenges,
  getChallengeById,
  likeChallenge,
} from "../controllers/challengesController.js";
import { protectRoute, optionalAuth } from "../middleware/protectRoute.js";

const router = Router();

router.post("/", protectRoute, createChallenge);
router.post("/like/:challengeId", protectRoute, likeChallenge);
router.get("/", optionalAuth, getChallenges);
router.get("/:id", getChallengeById);

export default router;
