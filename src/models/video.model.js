import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
    videoFile:{
        type : String,
        required : true
    },
    thumbnail : {
        type : String,
        required : true
    },
    title:{
        
        type : String,
        required : true
    },
    description:{
        
        type : String,
        required : true
    },
    duration:{
        
        type : Number,
        required : true
    },
    views:{
        
        type : Number,
        default: 0
    },
    isPublished:{
        type : Boolean,
        default: true
    },
    owner:{
        type : Schema.Types.ObjectId,
        ref: "User"
    }
},{timeStamp: true})

videoSchema.plugins(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)






//monagg ek plugins h ,ise export se phele likhna pdta h
// here we use core bcrypt it help us to hash or decrypt our password
// token k liye JWT(json web token) 