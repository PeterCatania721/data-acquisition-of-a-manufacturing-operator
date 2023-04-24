import express from "express";
import { create,getAll,fatigue,startTask, finishTask, getAllTask,addingDefaultTasks,getTask,getTaskByGroup} from "../controllers/User.js";

const router = express.Router();

router.route("/createUser").post(create);

router.route("/getUser").get(getAll);

router.route("/:id/addFatigue").post(fatigue);

router.route("/:id/addTask").post(startTask);

router.route("/:id/closeTask").post(finishTask);

router.route("/:id/getTask").get(getAllTask);

router.route("/task").post(addingDefaultTasks);

router.route("/getTask").get(getTask);

router.route("/:group/getTaskByGroup").get(getTaskByGroup);











//router.route("/register").post(register);
//router.route("/logout").get(getUser);

export default router;