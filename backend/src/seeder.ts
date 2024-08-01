import { houses } from './data/house';
import { User } from './models/user.model';
import { House } from './models/house.model';
import { users } from './data/user';
import mongoose from 'mongoose';
import config from './configs/app.config';
import path = require('path');
import { v2 as cloudinary } from 'cloudinary';

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

// Connect to MongoDB
mongoose.connect(config.MONGO_URL);
const seedData = async () => {
  try {
    // seed users

    const createdUsers = await User.insertMany(users);
    console.log('users seeded', createdUsers);

    // seed houses
    for (let house of houses) {
      const user = createdUsers[0];
      console.log(__dirname);

      const absoluteImagePath: string = path.resolve(
        __dirname,
        '..',
        'public',
        'image',
        house.imageUrl,
      );
      console.log('before', absoluteImagePath);

      const houseImage = await uploadOnCloudinary(absoluteImagePath);
      console.log(houseImage);
      if (!houseImage) return console.log('error while uploading image');
      house.imageUrl = houseImage.url;
      house.addedBy = user._id;

      const createdHouse = await House.create(house);
      console.log('house seeded', createdHouse);
    }
  } catch (error) {
    console.error('error while seeding: ', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
