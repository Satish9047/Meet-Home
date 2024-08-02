import { v2 as cloudinary } from 'cloudinary';

// CONFIGURATION
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// UPLOAD IMAGE
const uploadOnCloudinary = async (localFilepath: string) => {
  // console.log('inside', localFilepath);
  try {
    // if (!localFilepath) return null;
    // console.log('check', localFilepath);
    //upload the file in clouninary
    const uploadResult = await cloudinary.uploader.upload(localFilepath, {
      resource_type: 'auto',
    });
    //file has been uploaded on cloudinary
    console.log('file is uploaded on cloudinary', uploadResult.url);
    return uploadResult;
  } catch (error) {
    //remove the locally saved temporary file as the upload operation got failed
    // fs.unlinkSync(localFilepath);
    console.log('error while uploading image cloudinary catch', error);
    return null;
  }
};

const deleteImageFromCloudinary = async (imageUrl: string) => {
  try {
    const cloudinaryPublicId = imageUrl.split('/').pop()?.split('.')[0];
    //delete the image from cloudinary
    const deleteResult = await cloudinary.uploader.destroy(
      cloudinaryPublicId || '',
    );
    //image has been deleted on cloudinary
    console.log('image is deleted from cloudinary', deleteResult);
    return deleteResult;
  } catch (error) {
    // console.log('error while deleting image cloudinary catch', error);
    return null;
  }
};

export { uploadOnCloudinary, deleteImageFromCloudinary };
