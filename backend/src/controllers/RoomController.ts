import Container from "typedi";
import { NextFunction, Request, Response } from "express";
import { IRoomService } from "../service/Interfaces/IRoomService";
import { RoomSevice } from "../service/RoomService";
import { AppError } from "../errors/AppError";
import { Room } from "../models/Room";

export class RoomController {
  private roomService: IRoomService;

  constructor() {
    this.roomService = Container.get(RoomSevice);
  }

  getAllRooms = async (req: Request, res: Response) => {
    try {
      const allRooms = await this.roomService.getAllRooms();
      return res.status(200).json({
        message: "success",
        data: allRooms,
      });
    } catch (err) {
      throw err;
    }
  };

  getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId as string;
      const room = await this.roomService.getRoomById(roomId);
      if (!room) {
        return next(new AppError("Không thể tìm thấy phòng", 404));
      }
      return res.status(200).json({
        message: "sucess",
        room,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId as string;
      const room = await this.roomService.getRoomById(roomId);
      if (!room) {
        return next(new AppError("Phòng không tồn tại", 404));
      }
      await this.roomService.deleteRoomById(roomId);
      return res.status(200).json({
        message: "delete sucessfuly",
      });
    } catch (err) {
      next(err);
    }
  };

  addRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomNumber = req.body["room_number"] as number;
      const price = req.body["price"] as number;
      const roomArea = req.body["room_area"] as number;
      const roomStatus = req.body["room_status"] as string | undefined;
      await this.roomService.addRoom(roomNumber, price, roomArea, roomStatus);
      return res.status(201).json({
        message: "add room successfuly",
      });
    } catch (err) {
      next(err);
    }
  };

  filterRoomByPrice = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const lp = Number(req.query["lp"]) as number;
    const rp = Number(req.query["rp"]) as number;
    let rooms: Room[] | null;
    if(!lp && !rp) {
        rooms = await this.roomService.getAllRooms();
    } else {
        rooms = await this.roomService.filterRoomByPrice(lp, rp);
    }
    if (rooms?.length === 0) {
      return next(new AppError("Không thể tìm thấy phòng tương ứng", 404));
    }
    return res.status(200).json({
      message: "success",
      rooms,
    });
  };
}
