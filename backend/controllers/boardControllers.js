import asyncHandler from 'express-async-handler';
import Board from '../models/boardModel.js';

//* POST /api/boards/create - create new board
const createBoard = asyncHandler(async (req, res) => {
    const { name, scores, clueSets } = req.body;

    const board = await Board.create({
        creator: req.user._id,
        name,
        scores,
        clueSets: clueSets
    });

    console.log(board);

    if (board) {
        res.status(201).json(board);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//* GET /api/boards/ - get user's boards
const getUserBoards = asyncHandler(async (req, res) => {
    const boards = await Board.find({ creator: req.user._id });

    console.log(boards);

    res.status(200).json(boards);
});


export { createBoard, getUserBoards };