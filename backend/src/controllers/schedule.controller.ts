import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { User } from '../models/user.model';
import { House } from '../models/house.model';
import { Schedule } from '../models/schedule.model';
import logger from '../utils/logger';

/**
 * @description    Get visit schedule
 * @route          GET /api/v1/schedule
 * @access         Private (User || admin)
 */
export const getVisitSchedule = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const visitSchedule = await Schedule.find({});
      if (!visitSchedule) {
        return res
          .status(404)
          .json(new ApiResponse(404, {}, 'VisitSchedule not found'));
      }
      res
        .status(200)
        .json(
          new ApiResponse(200, visitSchedule, 'successfully get VisitSchedule'),
        );
    } catch (error) {
      logger.error('getVisitSchedule failed', error);
      throw new ApiError(500, 'error while getting the schedule', [
        {
          message: 'error while getting the schedule',
        },
      ]);
    }
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
      logger.info(
        `User ${req.user?._id} add visit schedule successfully`,
        addVisitSchedule,
      );
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
      logger.error(`User ${req.user?._id} add visit schedule failed`, error);
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
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const visitScheduleId = req.params.id;
    const scheduleExist = await Schedule.findById(visitScheduleId);
    if (!scheduleExist) {
      return res.json(new ApiResponse(404, {}, 'VisitSchedule not found'));
    }
    const { date, time, visited, message } = req.body;

    try {
      const updateVisitSchedule = await Schedule.findByIdAndUpdate(
        visitScheduleId,
        {
          date,
          time,
          visited,
          message,
        },
        { new: true },
      );

      logger.info(
        `User ${req.user?._id} update visit schedule ${visitScheduleId}`,
        updateVisitSchedule,
      );
      res.json(
        new ApiResponse(
          201,
          updateVisitSchedule,
          'successfully update VisitSchedule',
        ),
      );
    } catch (error) {
      logger.error(
        `User ${req.user?._id} update visit schedule ${visitScheduleId} failed`,
        error,
      );
      throw new ApiError(500, 'error while saving the schedule', [
        {
          message: 'error while saving the schedule',
        },
      ]);
    }
  },
);

/**
 * @description     Delete visit schedule
 * @route           DELETE /api/v1/schedule/:id
 * @access          Private (User || admin)
 */
export const deleteVisitSchedule = asyncHandler(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const visitScheduleId = req.params.id;

    const scheduleExist = await Schedule.findById(visitScheduleId);
    if (!scheduleExist) {
      return res.json(new ApiResponse(404, {}, 'VisitSchedule not found'));
    }
    try {
      const deletedSchedule = await Schedule.findByIdAndDelete(visitScheduleId);
      logger.info(
        `User ${req.user?._id} delete visit schedule ${visitScheduleId}`,
        deletedSchedule,
      );
      res
        .status(201)
        .json(
          new ApiResponse(
            201,
            { message: deletedSchedule },
            'successfully delete VisitSchedule',
          ),
        );
    } catch (error) {
      logger.error(
        `User ${req.user?._id} delete visit schedule ${visitScheduleId} failed`,
        error,
      );
      throw new ApiError(500, 'error while deleting the schedule', [
        {
          message: 'error while deleting the schedule',
        },
      ]);
    }
  },
);
