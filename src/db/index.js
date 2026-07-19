import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

/*DB is in another continent to ane me time lgega */
const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB host : ${connectionInstance.connection. host}`);        //ye console me hmne islie likha h taki hme pta rhe ki ham connect kidhar hue h , kyunki production ka alag host hota h development ka alag operation testing ka alg.
    }
    catch(error){
        console.log("MongoDB connection failed",error);
        process.exit(1);     //ye exit (1) code hote hai ki kis wajah se connection nhi hua,ye process yaha pe mtlb h jo hmari current process chl rhi h uska reference
          
    }
}

export default connectDB  