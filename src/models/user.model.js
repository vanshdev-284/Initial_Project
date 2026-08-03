import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})
const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique: true,
        lowercase: true,
        trim: true,
        index:true
    },
    email: {
        type : String,
        required : true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName : {
        type : String,
        required : true,
        lowercase: true,
        trim: true
    },
    avatar: {
        type : String,       //cloudnary url
        required : true

    },
    coverImage: {
        type: String
    },
    watchHistory: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Video"
    },
    password: {
        type: String,
        required : [true,"Password is required"]
    },
    refreshToken:{
        type: String
    }
},{timeStamp: true})

userSchema.pre("save", async function(){   //is function k ander next bhi likhte h bcz middleware h to next ana hi chahiye ,filhal mene error thik krne k lie hta dia tha
    if(!this.isModified("password")) return ;          //ye if islie use kra,bcz jab password change ho tabhi ye work kre wrna kuch bhi change kro ye work krne lgta ,aur isModified ek function h aur isme parameter string bnakar hi dete h
    this.password = await bcrypt.hash(this.password, 10)
    
})                   //ye pre hook hme data enter krne se phele hi kuch kaam krana ho to usnme use hota h

//middleware use kr rhe h to next to ayega hi,ye flag kaam ko hone k baad age pass kr deta h

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
} ;    //mongoose hme feature deta h uske ander methods inject krne ka , bcrypt ka feature hota h compare krne ka to use ham use kr lenge

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this.id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
};
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
};
const User = mongoose.model("User", userSchema);
export default User


//jwt is knon as bearer token like ye ek chabi h jiske pass hui use ham data de denge