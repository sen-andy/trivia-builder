import ClueSet from '../models/clueModel.js';
import asyncHandler from 'express-async-handler';

//* POST /api/clues/create - create clueset
const createClueSet = asyncHandler(async (req, res) => {
    const { category, questions } = req.body;

    const clueSet = await ClueSet.create({
        creator: req.user._id,
        category,
        questions: questions.slice(0, 5)
    })

    if(clueSet) {
        res.status(201).json(clueSet);
    } else {
        res.status(400);
        throw new Error('Clue data is invalid');
    }
});

//* Get /api/clues - get user's profile
const getClueSet = asyncHandler(async (req, res) => {
    const clueSet = await ClueSet.find({ creator: req.user._id });

    console.log(clueSet);

    res.status(200).json(clueSet);
});

export { createClueSet, getClueSet };