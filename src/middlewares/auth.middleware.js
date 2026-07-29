// ye file hm use krte for authentication purpose only !!
import jwt from "jsonwebtoken"
import {asynHandler} from "asyncHandler"
import User from "user.model.js"

import { ApiError } from "../utils/ApiError"


export const verifyJWT = asyncHandler(async(req,res,next) => {
    try {
        const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")  //yaha pr data header k form me bhi a skta h to, yaha use access krne ka format hot ah :Bearer <token> : to hme sirf token chahiye to bearer and space ko ek empty string se replace kr denge
    
        if(!token){
            throw new ApiError("Unauthorized access")
        }
    
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)    //yaha pr access token ko verify krenge means getting decoded info
    
        const user = await User.findById(decoded?._Id).select("-password -refreshToken")
        if(!user){
            req.user = user;
            next()
        }
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token.")
    }
})