import express from 'express';
import { requireSignIn } from '../controllers/user.controllers.js';
import { createPostController, deletePostController, getPostController, getUserController, updatePostController } from '../controllers/post.controllers.js';

const router = express.Router();

router.get("/get-all-post", getPostController);
router.get("/get-user-post", requireSignIn, getUserController);
router.delete("/delete-post/:id", requireSignIn, deletePostController);
router.post("/create-post", requireSignIn, createPostController);
router.put("/update-post/:id", requireSignIn, updatePostController);

export default router;