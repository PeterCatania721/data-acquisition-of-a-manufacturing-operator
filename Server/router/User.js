import express from "express";
import { login} from "../controllers/User.js";

const router = express.Router();

router.route("/login").post(login);


//router.route("/register").post(register);
//router.route("/logout").get(getUser);

export default router;