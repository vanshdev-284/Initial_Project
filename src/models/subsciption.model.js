import mongoose,{schema} from "mongoose";

const subSchema = new schema({
    subscriber :{
        type:Schema.Types.ObjectId,  //one who is subscribing
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId, //one to whom subscriber is subscribing
        ref: "User"
    }
},{timeStamp: true}) 

export const sub = mongoose.model("sub",subSchema);