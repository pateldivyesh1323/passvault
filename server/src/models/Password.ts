import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    }
)

const Password = mongoose.model("Password", passwordSchema);

export default Password;