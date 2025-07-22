
import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose"

const collectorSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },


    status:{
        type: String,
        enum:["pending","active"],
        default:"pending"
    },
    
    isApproved:{
        type: Boolean,
        default: "false"
    },

        
},{timestamps: true});

collectorSchema.plugin(normalize)

export const Collector = model('Collector', collectorSchema);