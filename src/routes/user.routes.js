import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);

export default router;

//yaha app.js se control isme aya ye fir yaha se hme register method call ho jayega