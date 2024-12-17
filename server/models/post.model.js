import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please add title"],
    },
    description: {
        type: String,
        required: [true, "please add description"],
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;