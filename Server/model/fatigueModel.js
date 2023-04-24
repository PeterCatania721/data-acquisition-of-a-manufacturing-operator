import mongoose from "mongoose";

const fatigueModel = new mongoose.Schema({



      idUser : {

        type : String,
        required : true

      },

      fatigue : {

        type : Number,
        required : true

      },

      comment : {
        type : String,
        default : ""
        
      },

      task: {
        type: String,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      }



}, { versionKey: false });



export const Fatigue =  mongoose.model("fatigues", fatigueModel);