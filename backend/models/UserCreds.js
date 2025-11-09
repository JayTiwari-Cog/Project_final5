import mongoose from "mongoose";

const UserCredsSchema = new mongoose.Schema({
     
    email: { 
        type: String, 
        required: true,
    },
    password: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

const UserCreds = mongoose.model("UserCreds", UserCredsSchema);
export default UserCreds;