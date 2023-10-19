import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        unique: [true, 'Name in database, please enter a new name']
    },
    scores: [{
        type: Number,
        required: true
    }],
    clues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clue',
        required: true
    }]
}, { timestamps: true });

const Board = mongoose.model('Board', boardSchema);

export default Board;