
import mongoose from "mongoose";
import { randomUUID } from "crypto";



const taskSchema = new mongoose.Schema({



  idUser: {

    type: String

  },

  nameTask : {

    type : String
    
},

comment : {

    type : String

},
    
  startAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type : String

  },

  finishAt: {
  
    type: Date,
    
  }

}, { versionKey: false });



export const Task = mongoose.model("tasks", taskSchema);
