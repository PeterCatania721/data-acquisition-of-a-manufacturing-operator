
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  nameTask : {
    type : String
  },
  group : {
    type : String
  },
}, { versionKey: false });

export const TaskGroup = mongoose.model("tasksGroup", taskSchema);
