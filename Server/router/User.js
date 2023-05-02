import express from "express";
import { 
    createUser,
    getAllUsers,
    createFatigue,
    getFatigue,
    startTask,
    finishTask,
    getAllTasks,
    addGroupTask,
    getGroupTasks,
    getTasksByGroup,
    getTasksInProgress,
    uploadStartTask,
    uploadFatigue,
    uploadFinishTask,
} from "../controllers/User.js";

const router = express.Router();

router.route("/createUser").post(createUser);

router.route("/getUser").get(getAllUsers);

router.route("/:id/addFatigue").post(createFatigue);

router.route("/getFatigue").get(getFatigue);

router.route("/:id/startTask").post(startTask);

router.route("/:id/closeTask").post(finishTask);

router.route("/:id/getTask").get(getAllTasks);

router.route("/addGroupTask").post(addGroupTask);

router.route("/getGroupTasks").get(getGroupTasks);

router.route("/:group/getTaskByGroup").get(getTasksByGroup);

router.route("/:id/getTaskInProgress").get(getTasksInProgress);

router.route("/:id/uploadStartTask").post(uploadStartTask);

router.route("/:id/uploadFatigue").post(uploadFatigue);

router.route("/:id/uploadFinishTask").post(uploadFinishTask);

export default router;