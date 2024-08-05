import { JwtPayload } from 'jsonwebtoken';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { House } from '../models/house.model';
import { Schedule } from '../models/schedule.model';
import { ApiError } from '../utils/apiError';

/**
 * @description    Get visit schedule
 * @route          GET /api/v1/schedule
 * @access         Public
 */
export const getVisitSchedule = asyncHandler(
  async (req: Request, res: Response) => {
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { message: 'here is the bookedSchedule' },
          'successfully get VisitSchedule',
        ),
      );
  },
);

/**
 * @description    Add visit schedule
 * @route          POST /api/v1/schedule
 * @access         Private (User || admin)
 */
export const addVisitSchedule = asyncHandler(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const userExist = await User.findById(req.user?._id);

    if (!userExist)
      return res.status(404).json(new ApiResponse(404, {}, 'User not found'));

    const { houseId, userId, date, time, visited, message } = req.body;

    const houseExist = await House.findById(houseId);
    if (!houseExist || houseExist.available === false)
      return res
        .status(404)
        .json(new ApiResponse(404, {}, 'House in not available'));

    try {
      const addVisitSchedule = await Schedule.create({
        houseId,
        userId,
        date,
        time,
        visited: false,
        message,
      });
      res
        .status(201)
        .json(
          new ApiResponse(
            201,
            addVisitSchedule,
            'successfully add VisitSchedule',
          ),
        );
    } catch (error) {
      console.log('error while saving the schedule', error);
      throw new ApiError(500, 'error while saving the schedule', [
        {
          message: 'error while saving the schedule',
        },
      ]);
    }
  },
);

/**
 * @description     Update visit schedule
 * @route           PUT /api/v1/schedule/:id
 * @access          Private (User || admin)
 */
export const updateVisitSchedule = asyncHandler(
  async (req: Request, res: Response) => {
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { message: 'updated bookedSchedule' },
          'successfully update VisitSchedule',
        ),
      );
  },
);

/**
 * @description     Delete visit schedule
 * @route           DELETE /api/v1/schedule/:id
 * @access          Private (User || admin)
 */
export const deleteVisitSchedule = asyncHandler(
  async (req: Request, res: Response) => {
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { message: 'deleted bookedSchedule' },
          'successfully delete VisitSchedule',
        ),
      );
  },
);
