import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import {
    createClues,
    getClues
} from '../controllers/clueControllers.js';

router.post('/create', protect, createClues);
router.get('/', protect, getClues);

export default router;