import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose"

const userSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role:{
        type: String,
        default: "user"
    },
},{timestamps: true});

userSchema.plugin(normalize)

export const User = model ( 'User', userSchema);