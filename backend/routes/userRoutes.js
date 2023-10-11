import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userControllers.js';

router.post('/auth', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;