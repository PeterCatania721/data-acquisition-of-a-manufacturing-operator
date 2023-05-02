import mongoose from "mongoose";

import { User } from "../model/userModel.js";
import { Task } from "../model/taskModel.js";
import { Fatigue } from "../model/fatigueModel.js";
import { TaskGroup } from "../model/taskSchemaModel.js";

export const connectDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const emptyDatabase = async () => {
  try {
    //await User.deleteMany({});
    //await Task.deleteMany({});
    //await Fatigue.deleteMany({});
    await TaskGroup.deleteMany({});
  } catch (error) {
    console.log(error);
  }
};

const manufacturerOperatorTasks = [
    { group: 'Manufacturer Operator', nameTask: 'pulire filtro dell\'aria della ventilazione nord' },
    { group: 'Manufacturer Operator', nameTask: 'produzione cushinetti 250mm' },
    { group: 'Manufacturer Operator', nameTask: 'pakaging degli scarti di produzione ' },
    { group: 'Manufacturer Operator', nameTask: 'Pulizia pavimenti' },
    { group: 'Manufacturer Operator', nameTask: 'Supervisionare tornio verticale' },
    { group: 'Manufacturer Operator', nameTask: 'Produzione super manafold' },
    { group: 'Manufacturer Operator', nameTask: 'Supervisionamento automazione viti' },
  ];

export const insertData = async () => {
  try {

    // create new document for each task, and save it to the database
    let tasks = [];
    for (const task of manufacturerOperatorTasks) {
      tasks.push(new TaskGroup(task));
    }
    await TaskGroup.insertMany(tasks);

  } catch (error) {
    console.log(error);
  }
}