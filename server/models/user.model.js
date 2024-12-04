import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "please add email"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "please add email"],
        min: 6,
        max: 64
    },
    role: {
        type: String,
        default: "user"
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;