import { User } from "../model/userModel.js";
import { Task } from "../model/taskModel.js";
import { Fatigue } from "../model/fatigueModel.js";
import { randomUUID } from "crypto";


export const allUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
  
};

export const create = async (req, res) => {
  try {

 let  user = await User.create({
      idUser: randomUUID(),
    });

    await user.save();

    res.status(201).json({user });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * 
 * @param {*} id 
 * @returns check if user exist
 *
 */

async function checkExistUser(id) {

const users = await User.find({idUser : id});

if(users.length === 0){
  return Promise.resolve(false);
} else {
  return Promise.resolve(true);
}
}

/**
 * 
 * 
 * @param {*} req
 * @param {*} res
 *   add fatigue to user
 * 
  */

export const fatigue = async (req, res) => {

  const id = req.params.id;

 const userExist = await checkExistUser(id);

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

/**
 * 
 * get all  user
 * 
  */

export const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
  
};

export const startTask = async (req, res) => {

  const id = req.params.id;

 const userExist = await checkExistUser(id);

 console.log(userExist);



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

export const finishTask = async (req, res) => {

  const id = req.params.id;

 const userExist = await checkExistUser(id);

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
export const getAllTask = async (req, res) => {

  const id = req.params.id;

 const userExist = await checkExistUser(id);

 console.log(userExist);

 if(!userExist){
  res.status(400).json({ success: false, message: "User not exist" });
  return;
  }

  const tasks = await Task.find({idUser: id});

  res.status(200).json({ success: true, tasks });

}
