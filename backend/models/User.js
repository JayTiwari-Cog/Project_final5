import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
         type: String,
          required: true 
        },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true
    },
    role:{
        type: String,
        enum: ['user', 'manager'],
        default: 'user'
    },
    feedbacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }]
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;