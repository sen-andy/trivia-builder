import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import {
    createClueSet,
    getClueSet
} from '../controllers/clueControllers.js';

router.post('/create', protect, createClueSet);
router.get('/', protect, getClueSet);

export default router;