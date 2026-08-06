import mongoose , {Schema} from "mongoose";

const playlistSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    videos: [{
        type: Schema.Types.ObjectId ,
        required:true,
        ref: "Video"
    }],
    owner: {
        ref: "User",
        type: Schema.Types.ObjectId
    }
},{timestamps:true});

export const Playlist = mongoose.model("Playlist" , playlistSchema)