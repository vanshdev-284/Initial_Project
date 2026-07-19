
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import User from "../models/user.model.js"
import uploadCloudinary from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async(req,res) => {   
    //ye syntax 1000 jagah repeat hona h to learn it
    // res.status(200).json({
    //     mesaage:"Ok"
    // })

    //get user detail from backend
    //validation - not empty(prodn me iski file alag bnti h lekin yaha hm nhi bna rhe)
    //check if user already not exist : by username or email
    //check for images and check for avatar
    //upload it on cloudinary,avatar bhi dekhenge ki wo hua ki nhi
    //create a user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response 

    const {fullName,email,username,password} = req.body         //ye req.body jab use krte h jab hm body se ya json format me data a rha ho or url ka alag system h

    //console.log("email :",email )

    // //ek to taika h ki alag alag conditions likhke check krlo,aur ek tarika h some function usme multiple parameter ek baar me check kr skte h

    // // if(fullName === ""){
    // //     throw new ApiError(400, "full name is required")
    // // }

    if(
        [fullName , email , username , password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required.")
    } 
    
    // //ab hme check krna h ki user phele se exist to nhi kr rha to hm findone funcn use kr lenge
    const existedUser = await User.findOne({
        $or : [{ username },{ email }]    //ye $or mdb ka function h ,agr koi bhi ek value true hui to ye true return kr dega
    })

    if(existedUser){
        throw new ApiError(409 , "User with email or username already exist")
    }
    console.log(req.files)
    // //Express hme body ka access deta h lekin hmne multer me jo upload middleware bnaya h wo hme file ka bhi access deta h to usse hm image bhi la skte h

    const avatarLocalPath = req.files?.avatar[0]?.path;   //ye hme file ka path de dega jo multer ne upload kia h,ye 0 ka mtlb h first property
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }
    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" //ye find by user ek function h jisse hmm pta lga skte h ki us id ka user h ki nhi ,aur ye select se hm koi bhi entry select kr skte h ,yaha minus sign ka mtlb h ki hme ye select nhi krni , ye syntax hi wierd sa h lekin esa hi h ratle !!
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering.")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered sucessfully")
    )

})

export {registerUser}