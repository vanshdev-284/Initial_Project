import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async(req,res) => {   //ye syntax 1000 jagah repeat hona h to learn it
    res.status(200).json({
        message:"ok"    
    })
})

export {registerUser}