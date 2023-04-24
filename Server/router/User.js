import express from "express";
import { create,getAll,fatigue,startTask, finishTask, getAllTask} from "../controllers/User.js";

const router = express.Router();

router.route("/createUser").post(create);

router.route("/getUser").get(getAll);

router.route("/:id/addFatigue").post(fatigue);

router.route("/:id/addTask").post(startTask);

router.route("/:id/closeTask").post(finishTask);

router.route("/:id/getTask").get(getAllTask);







//router.route("/register").post(register);
//router.route("/logout").get(getUser);

export default router;