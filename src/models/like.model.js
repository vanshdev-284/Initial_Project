import mongoose , {Schema} from "mongoose";

const likeSchema = new Schema({
    video: {
        ref: "Video",
        type: Schema.Types.ObjectId
    },
    comment: {
        ref: "Comment",
        type: Schema.Types.ObjectId
    },
    tweet: {
        ref: "tweet",
        type: Schema.Types.ObjectId
    },
    likeBy: {
        ref: "User",
        type: Schema.Types.ObjectId
    }
},{timestamps:true});

export const Like = mongoose.model("Like" , likeSchema)