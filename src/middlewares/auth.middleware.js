// ye file hm use krte for authentication purpose only !!
import jwt from "jsonwebtoken"
import {asyncHandler} from "../utils/asyncHandler.js"
import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"


const verifyJWT = asyncHandler(async(req,res,next) => {
    try {
        console.log(req.cookies)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")  //yaha pr data header k form me bhi a skta h to, yaha use access krne ka format hot ah :Bearer <token> : to hme sirf token chahiye to bearer and space ko ek empty string se replace kr denge
        console.log(token);
        
        
        if(!token){
            throw new ApiError(401,"Unauthorized access")
        }
        console.log("vardaab ki gand me piyush ka lund 8 inch ka")
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)    //yaha pr access token ko verify krenge means getting decoded info
        
        const user = await User.findById(decoded?._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(404,"User not found")
        }
        req.user = user;
        next()
    } catch (error) {
        console.log("fir chuda");
        throw new ApiError(401,error?.message || "Invalid access token.")
    }
})

export {verifyJWT}