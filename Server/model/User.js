import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    id: {type: String, required: true, unique : true},

});

export const User =  mongoose.model("User", userSchema);