import userModel from '../models/user.model.js'
import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken'
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
        const hashPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashPassword,
        });

        await user.save();
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
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Provide Details"
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        user.password = undefined;
        return res.status(200).send({
            success: true,
            message: "Login Successful",
            token,
            user,
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Login API",
            error,
        })
    }
}
