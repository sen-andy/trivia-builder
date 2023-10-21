import Clue from '../models/clueModel.js';
import asyncHandler from 'express-async-handler';

//* POST /api/clues/create - create clues
const createClues = asyncHandler(async (req, res) => {
    const { category, questions } = req.body;

    const clue = await Clue.create({
        creator: req.user._id,
        category,
        questions: questions.slice(0, 5)
    })

    if(clue) {
        res.status(201).json(clue);
    } else {
        res.status(400);
        throw new Error('Clue data is invalid');
    }
});

//* Get /api/clues - get user's profile
const getClues = asyncHandler(async (req, res) => {
    const clue = await Clue.find({ creator: req.user._id }).populate("creator", "name");

    res.status(200).json(clue);
});

export { createClues, getClues };