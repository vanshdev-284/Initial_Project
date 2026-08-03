import { Router } from "express";
import { registerUser,
    loginUser,
    logOutUser,
    refreshTokenAgain,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetail,
    updateCoverImage,
    updateAvatar,
    getUserChannelProfile} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"
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

router.route("/login").post(loginUser);

//secured routes for logging out

router.route("/logOut").post(verifyJWT , logOutUser);  //yaha hmne 2 method call kiye to router confuse na ho jaye ki konsa phele use kru islie verify jwt me hmne next() use kia tha middleware me
router.route('/refresh-token').post(refreshTokenAgain);
router.route("/updateAvatar").post(verifyJWT, upload.single("avatar"), updateAvatar);
router.route("/updateCover").post(verifyJWT, upload.single("coverImage"), updateCoverImage);
export default router;

//yaha app.js se control isme aya ye fir yaha se hme register method call ho jayega