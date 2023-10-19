import mongoose from 'mongoose';

const clueSchema = new mongoose.Schema({
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
                type: String
            },
            question: {
                type: String
            },
            correctResponse: {
                type: String
            }
        }
    ]
}, { timestamps: true });

const Clue = mongoose.model('Clue', clueSchema);

export default Clue;