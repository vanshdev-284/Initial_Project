// ye file hm use krte for authentication purpose only !!
import jwt from "jsonwebtoken"
import {asyncHandler} from "../utils/asyncHandler.js"
import User from "../models/user.model.js"

import { ApiError } from "../utils/ApiError.js"


const verifyJWT = asyncHandler(async(req,res,next) => {
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

export {verifyJWT}