import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    userName: String,
    email: String,
    active: Boolean,
    password: String
})

export default mongoose.model("users", usersSchema)