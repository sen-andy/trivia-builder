import mongoose from 'mongoose';

const clueSetSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        required: true
    },
    questions: [
        {
            _id: false,
            type: {
                type: String,
                required: true
            },
            question: {
                type: String,
                required: true,
            },
            correctResponse: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });

const ClueSet = mongoose.model('ClueSet', clueSetSchema);

export default ClueSet;