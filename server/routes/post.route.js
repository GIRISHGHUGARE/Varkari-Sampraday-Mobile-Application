import express from 'express';
import { requireSignIn } from '../controllers/user.controllers.js';
import { createPostController, deletePostController, getPostController } from '../controllers/post.controllers.js';

const router = express.Router();

router.get("/get-post", getPostController);
router.delete("/delete-post", deletePostController);

router.post("/create-post", requireSignIn, createPostController);

export default router;