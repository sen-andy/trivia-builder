import asyncHandler from 'express-async-handler';

//! public

//* POST /api/users/auth - login user and return token
const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Auth User'});
});


//* POST /api/users/register - register new user
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Auth User'});
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