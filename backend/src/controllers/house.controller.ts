import { Request, Response } from 'express';

import { House } from '../models/house.model';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

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
export const addHouse = asyncHandler(async (req: Request, res: Response) => {
  const localFilePath = req.file?.path;
  console.log(localFilePath);
  res.status(200).json({
    message: 'add house',
  });
});

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
