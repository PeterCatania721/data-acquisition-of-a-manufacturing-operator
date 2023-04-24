
import mongoose from "mongoose";
import { randomUUID } from "crypto";



const taskSchema = new mongoose.Schema({



  nameTask : {

    type : String
    
},

group : {

    type : String

},
    

}, { versionKey: false });



export const TaskModel = mongoose.model("tasksGroup", taskSchema);
