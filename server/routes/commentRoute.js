import express from 'express';
import requireAuth from '../middleware/authMiddleware.js';

import { getComments, addComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

// require auth for all comment routes
router.use(requireAuth);

// GET all comments for a post
router.get('/:post_id', getComments);

// PATCH add a comment to a post
router.patch('/:post_id', addComment);

// DELETE a comment from a post
router.delete('/:post_id/:comment_id', deleteComment);

export default router;