import { v2 as cloudinary } from "cloudinary";
import fs from "fs";  //ye file system k liye h like hme file read krni h ya write and other properties or +ye node k sath hi download ho jata h

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

const uploadCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type : 'auto'
        })
        //file has been uploaded successfully
        //console.log("file uploaded successfully", response.url)
        fs.unlinkSync(localFilePath)
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath)  //remove the locally saved temporary file as the uploadd operation got failed
        return null;
    }
} 

const removePre = async(old_image_public_id) => {
    try {
        
        const removed = await cloudinary.v2.uploader.destroy(old_image_public_id, {resource_type: 'auto'});
        console.log(removed)
        
        return removed;
    } catch (error) {
        console.log("Previous Image is not removed from the server.");
        return null;
    }
}

export { removePre };
export default uploadCloudinary
    
    