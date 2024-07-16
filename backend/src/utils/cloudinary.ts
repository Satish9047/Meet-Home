import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// CONFIGURATION
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// UPLOAD IMAGE
const uploadOnCloudinary = async (localFilepath: string) => {
  try {
    if (!localFilepath) return null;
    //upload the file in clouninary
    const uploadResult = await cloudinary.uploader.upload(localFilepath, {
      resource_type: 'auto',
    });
    //file has been uploaded on cloudinary
    console.log('file is uploaded on cloudinary', uploadResult.url);
    return uploadResult;
  } catch (error) {
    //remove the locally saved temorary file as the upload operation got failed
    fs.unlinkSync(localFilepath);
    return null;
  }
};

export { uploadOnCloudinary };
