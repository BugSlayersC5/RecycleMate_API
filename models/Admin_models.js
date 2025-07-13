import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const adminSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

adminSchema.plugin(normalize);

export const Admin = model("Admin", adminSchema);
