import express from 'express';
const router = express.Router();
import { createBoard, getUserBoards } from '../controllers/boardControllers.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/create', protect, createBoard);
router.get('/', protect, getUserBoards);

export default router;