import userModel from '../models/user.model.js'
export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.status(400).send({
                success: false,
                message: "name is required"
            })
        }
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "email is required"
            })
        }
        if (!password || password.length < 6) {
            return res.status(400).send({
                success: false,
                message: "password must be 6 characters long"
            })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: 'User already exists!'
            })
        }
        const user = await userModel({ name, email, password });
        user.save();
        return res.status(201).send({
            success: true,
            message: "Registration Successful"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error,
        })
    }
};
