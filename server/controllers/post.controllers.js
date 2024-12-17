import postModel from '../models/post.model.js'

export const createPostController = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }
        const post = await postModel({
            title,
            description,
            postedBy: req.auth._id
        }).save();
        res.status(201).send({
            success: true,
            message: "Post created successfully",
            post,
        })
        console.log(req)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Create Post API',
            error,
        })
    }
};
export const deletePostController = async (req, res) => {
    try {
        const { id } = req.params;
        await postModel.findByIdAndDelete({ _id: id });
        return res.status(200).send({
            success: true,
            message: "Your post has been deleted successfully!"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Delete Post API",
            error,
        })
    }
}

export const getPostController = async (req, res) => {
    try {
        const post = await postModel.find()
            .populate("postedBy", "_id name")
            .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "All post data",
            post,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error in Get Post API"
        })
    }
}

export const getUserController = async (req, res) => {
    try {
        const userPost = await postModel.find({ postedBy: req.auth._id })
        return res.status(200).send({
            success: true,
            message: "All user post data",
            userPost,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error in User Post API"
        })
    }
}

export const updatePostController = async (req, res) => {
    try {
        const { title, description } = req.body
        const post = await postModel.findById({ _id: req.params.id });
        if (!title || !description) {
            return res.status(500).send({
                success: false,
                message: "Please provide title or description",
            })
        }
        const updatedPost = await postModel.findByIdAndUpdate({ _id: req.params.id },
            {
                title: title || post?.title,
                description: description || post?.description
            }, { new: true })
        return res.status(200).send({
            success: true,
            message: "Post updated successfully",
            updatedPost,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error in update Post API"
        })
    }
}
