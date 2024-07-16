import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';

export const getHouse = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'get house',
  });
});

export const getHousesById = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({
      message: 'get houses by Id',
    });
  },
);

export const addHouse = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'add house',
  });
});

export const updateHouse = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'update house',
  });
});

export const deleteHouse = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'delete house',
  });
});
