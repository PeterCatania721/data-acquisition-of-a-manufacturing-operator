
import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';
import { randomUUID } from "crypto";






const userSchema = new mongoose.Schema({



  idUser: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }

}, { versionKey: false });



export const User = mongoose.model("users", userSchema);
