import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/register").post(
    upload.fields([                //ye hmne middleware use kia bcz hme data upload krna tha aur field me data array k form me store hota h,baki uske ander hmne json file bna li
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser);

export default router;

//yaha app.js se control isme aya ye fir yaha se hme register method call ho jayega