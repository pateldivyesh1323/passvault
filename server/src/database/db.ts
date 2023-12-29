import mongoose from "mongoose";
import enviroments from "../../utils/enviroments";

const mongouri = enviroments.mongo_uri;

const connectDB = async () => {
    try {
        await mongoose.connect(mongouri);
        console.log("Successfully connected to database.");
    } catch (error) {
        console.log("Failed to connect to database : ", error);
    }
}

export default connectDB;