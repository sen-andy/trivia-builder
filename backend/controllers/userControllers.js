import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//! public

//* POST /api/users/auth - login user and return token
const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Auth User'});
});


//* POST /api/users/register - register new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    };

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    };
});

//* POST /api/users/logout - logout user
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Auth User'});
});

//! private

//* GET /api/users/profile - get user's profile
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Auth User'});
});

//* PUT /api/users/profile - get user's profile
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Auth User'});
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};