import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    hotelId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Hotel',
    },

    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
