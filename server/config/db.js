import mongoose from "mongoose"
import colors from "colors"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to ${mongoose.connection.host}`.bgCyan.white)
    } catch (error) {
        console.log(`error in connection DB ${error}`.bgRed.white)

    }
}

export default connectDB;