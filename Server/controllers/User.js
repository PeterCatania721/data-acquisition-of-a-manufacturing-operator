// External imports
import { randomUUID } from "crypto";

// Internal imports
import { User } from "../model/userModel.js";
import { Task } from "../model/taskModel.js";
import { Fatigue } from "../model/fatigueModel.js";
import { TaskGroup } from "../model/taskSchemaModel.js";

// get all users
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
  
};

// create new user
export const createUser = async (req, res) => {
  try {

    const id = req.body.idUser;
    if (id != null && await userExists(id)) {
      res.status(200).json({ success: true, message: "User already exist", user: {idUser: id}});
      return;
    }

    
    let user = await User.create({
      idUser: id == null ? randomUUID() : id,
    });

    await user.save();

    res.status(201).json({user});
    

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// check if user exist in database
async function userExists(id) {
  const users = await User.find({idUser : id});

  if(users.length === 0){
    return Promise.resolve(false);
  } else {
    return Promise.resolve(true);
  }
}

// get task by group
export const getTasksByGroup = async (req, res) => {
  const group = req.params.group;

  try {
    const tasks = await TaskGroup.find({group: group});

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// get all tasks that are associated to a group
export const getGroupTasks = async (req, res) => {
  try {
    const tasks = await TaskGroup.find();
    console.log(tasks);

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// add a new task to a group
export const addGroupTask = async (req, res) => {

  const {nameTask,group} = req.body;

  let tasks = await TaskGroup.create({

    nameTask: nameTask,
    group: group,

  });
  
  await tasks.save();

  res.status(201).json({ success: true, tasks });


};

// create a new fatigue associated to a user and task
export const createFatigue = async (req, res) => {

  const id = req.params.id;

  const userExist = await userExists(id);

  console.log(userExist);

  if(!userExist){
    res.status(400).json({ success: false, message: "User not exist" });
    return;
  }else {
    const { fatigue,comment } = req.body;

    const task = await Task.findOne({idUser : id,status : "IN_PROGRESS"});

    if(task){
      let fat  = await Fatigue.create({
        idUser: id,
        fatigue: fatigue,
        comment: comment,
        task: task.nameTask,
        
      });

      await fat.save();

      res.status(201).json({ success: true,fatigue:  fat });
    }else {
      res.status(400).json({ success: false, message: "Task not started" });
    }
  }
};

// get all fatigue records
export const getFatigue = async (req, res) => {
  
  try {
    const fatigue = await Fatigue.find();

    res.status(200).json({ success: true, fatigue});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all users 
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
  
};

// start a task
export const startTask = async (req, res) => {

  const id = req.params.id;

  const userExist = await userExists(id);

  if(!userExist){
    res.status(400).json({ success: false, message: "User not exist" });
    return;
  }

  const { nameTask,comment } = req.body;

  let task  = await Task.create({
    idUser: id,
    nameTask: nameTask,
    comment: comment,
    status: "IN_PROGRESS",
    
  });

  await task.save();

  res.status(201).json({ success: true,task:  task });

};

// finish a task
export const finishTask = async (req, res) => {

  const id = req.params.id;

  const userExist = await userExists(id);

  console.log(userExist);

  if(!userExist){
  res.status(400).json({ success: false, message: "User not exist" });
  return;
  }

  //update task

  await Task.findOneAndUpdate({idUser: id,status: "IN_PROGRESS"},{status: "DONE",finishAt: Date.now()});

  res.status(200).json({ success: true, message: "Task update" });

}

//get all task by user
export const getAllTasks = async (req, res) => {

  const id = req.params.id;

  const userExist = await userExists(id);

  console.log(userExist);

  if(!userExist){
    res.status(400).json({ success: false, message: "User not exist" });
    return;
  }

  const tasks = await Task.find({idUser: id});

  res.status(200).json({ success: true, tasks });

}

// get all tasks that are in progress
export const getTasksInProgress = async (req, res) => {
  const id = req.params.id;
  const userExist = await userExists(id);

  if(!userExist){
    res.status(400).json({ success: false, message: "User not exist" });
    return;
  } try {
    const tasks = await Task.find({idUser : id,status : "IN_PROGRESS"});
    res.status(200).json({tasks});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// upload start task already done
export const uploadStartTask = async (req, res) => {
  const id = req.params.id;

  const userExist = await userExists(id);

  if(!userExist){
    res.status(400).json({ success: false, message: "User not exist" });
    return;
  }

  const { 
    currentActivity,
    startedAt,
  } = req.body;

  let task  = await Task.create({
    idUser: id,
    nameTask: currentActivity,
    startAt: startedAt,
    status: "IN_PROGRESS",
  });

  await task.save();

  res.status(201).json({ success: true,task:  task });
}

// upload fatigue operation already done
export const uploadFatigue = async (req, res) => {
  const id = req.params.id;

  const userExist = await userExists(id);

  console.log(userExist);

  if(!userExist){
    res.status(400).json({ success: false, message: "User not exist" });
    return;
  }

  const { 
    fatigue,
    comment,
    createdAt,
    currentActivity,
  } = req.body;

  let fat  = await Fatigue.create({
    idUser: id,
    fatigue: fatigue,
    comment: comment,
    task: currentActivity,
    createdAt: createdAt,
  });

  await fat.save();

  res.status(201).json({ success: true,fatigue:  fat });
}

// upload finish task operation already done
export const uploadFinishTask = async (req, res) => {
  const id = req.params.id;

  const userExist = await userExists(id);

  if(!userExist){
    res.status(400).json({ success: false, message: "User not exist" });
    return;
  }

  const {
    finishedAt,
  } = req.body;

  //update task
  await Task.findOneAndUpdate({idUser: id,status: "IN_PROGRESS"},{status: "DONE",finishAt: finishedAt});

  res.status(200).json({ success: true, message: "Task update" });
}