import { Request, Response } from 'express';

import logger from '../utils/logger';
import { House } from '../models/house.model';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { uploadOnCloudinary } from '../utils/cloudinary';
import { JwtPayload } from 'jsonwebtoken';

/**
 *@description    Fetch all houses
 *@routes         GET /api/v1/houses
 *@access         Public
 */
export const getHouse = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const houses = await House.find({}).skip(skip).limit(limit);

  if (!houses || houses.length === 0) {
    res.status(404).json(new ApiResponse(404, {}, 'No house found'));
  }

  const totalHouse = await House.countDocuments({});
  const totalPages = Math.ceil(totalHouse / limit);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { houses, page, limit, totalPages, totalHouse },
        'House found',
      ),
    );
});

/**
 *@description    Fetch a single houses
 *@routes         GET /api/v1/houses/:id
 *@access         Public
 */
export const getHousesById = asyncHandler(
  async (req: Request, res: Response) => {
    const house = await House.findById(req.params.id);
    if (!house) {
      res.status(404).json(new ApiResponse(404, {}, 'No house found'));
    }
    res.status(200).json(new ApiResponse(200, house, 'House found'));
  },
);

/**
 * @description    Add a new house
 * @routes         POST /api/v1/houses
 * @access         Admin
 */
export const addHouse = asyncHandler(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user;
    if (!user || user.isAdmin === false) {
      logger.fatal('unauthorized user trying to add house', user);
      return res
        .status(403)
        .json(new ApiResponse(403, {}, 'unauthorized user'));
    }

    const localFilePath = req.file?.path;
    if (!localFilePath) {
      logger.error("didn't get localFilePath of an image", localFilePath);
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "didn't get localFilePath of an image"));
    }

    const uploadResult = await uploadOnCloudinary(localFilePath!);
    if (!uploadResult) {
      logger.error('error while uploading to cloudinary', uploadResult);
      return res
        .status(400)
        .json(new ApiResponse(400, {}, 'error while uploading to cloudinary'));
    }

    const {
      houseName,
      price,
      location,
      area,
      kitchen,
      bedrooms,
      bathrooms,
      washrooms,
      totalFloor,
      available,
      description,
    } = req.body;

    const house = await House.create({
      houseName,
      price,
      location,
      area,
      kitchen,
      bedrooms,
      bathrooms,
      washrooms,
      imageUrl: uploadResult.url,
      addedBy: user._id,
      totalFloor,
      available,
      description,
    });
    if (!house) {
      logger.error('error while adding house', house);
      return res
        .status(400)
        .json(new ApiResponse(400, {}, 'error while adding house'));
    }

    logger.info('house added in mongodb', house);
    res
      .status(201)
      .json(new ApiResponse(201, house, 'House added successfully'));
  },
);

/**
 * @description    Update a house
 * @routes         PUT /api/v1/houses/:id
 * @access         Admin
 */
export const updateHouse = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'update house',
  });
});

/**
 * @description    Delete a house
 * @routes         DELETE /api/v1/houses/:id
 * @access         Admin
 */
export const deleteHouse = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'delete house',
  });
});
