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

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error in Get Post API"
        })
    }
}
