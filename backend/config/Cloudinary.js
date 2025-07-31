import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
const uploadOnCloudinary = async (filepath) => {
    cloudinary.config({ 
        cloud_name: process.env.Cloudinary_cloud_name, 
        api_key: process.env.Cloudinary_Api, 
        api_secret: process.env.Cloudinary_Api_Secret
    });

    try {
        if (!filepath) {
            return null;
        }
        const result = await cloudinary.uploader.upload(filepath,{resource_type: 'raw'});
        fs.unlinkSync(filepath); // Delete the file after upload
        console.log('Uploaded to Cloudinary:', result);
        return result;
    } 
    catch (error) {
        fs.unlinkSync(filepath);
        console.error('Error uploading to Cloudinary:', error);
        
    }
};

export default uploadOnCloudinary;
