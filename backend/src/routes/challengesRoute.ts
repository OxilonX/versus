import { Router } from "express";
import {
  createChallenge,
  getChallenges,
  getChallengeById,
  likeChallenge,
  deleteChallenge,
  reportChallenge,
} from "../controllers/challengesController.js";
import { protectRoute, optionalAuth } from "../middleware/protectRoute.js";

const router = Router();

router.delete("/:challengeId", protectRoute, deleteChallenge);
router.post("/", protectRoute, createChallenge);
router.post("/like/:challengeId", protectRoute, likeChallenge);
router.get("/", optionalAuth, getChallenges);
router.get("/:challengeId", getChallengeById);
router.post("/:challengeId/report", protectRoute, reportChallenge);
export default router;
