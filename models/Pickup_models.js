
import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose"

const pickupSchema = new Schema({
    wasteType:{
        type: String,
        required: true
    },

    location:{
        type: String,
        required: true
    },

    date:{
        type: String,
        required: true
    },

    time:{
        type: String,
        required: true
    },

    status:{
        type: String,
        default: "pending"
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: "User"

    },

},{timestamps: true});

pickupSchema.plugin(normalize)

export const Pickup = model('Pickup', pickupSchema);

