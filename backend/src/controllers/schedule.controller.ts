import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';

/**
 * @description    Get booked schedule
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
 * @description    Add booked schedule
 * @route          POST /api/v1/schedule
 * @access         Private (User || admin)
 */
export const addVisitSchedule = asyncHandler(
  async (req: Request, res: Response) => {
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { message: ' bookedSchedule added' },
          'successfully add VisitSchedule',
        ),
      );
  },
);

/**
 * @description     Update booked schedule
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
 * @description     Delete booked schedule
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
