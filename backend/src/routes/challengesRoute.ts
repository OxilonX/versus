import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
} from "../controllers/challengesController.js";

const router = Router();

router.post("/posts", createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);

export default router;
