import Container from "typedi";
import { IDeviceService } from "../service/Interfaces/IDeviceService";
import { DeviceService } from "../service/DeviceService";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export class DeviceController {
  private deviceService: IDeviceService;

  constructor() {
    this.deviceService = Container.get(DeviceService);
  }

  getAllDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allDevice = await this.deviceService.getAllDevice();
      if (allDevice.length === 0) {
        return next(new AppError("Không thể tìm thấy thiết bị", 404));
      }
      return res.status(200).json({
        message: "Success",
        allDevice,
      });
    } catch (err) {
      next(err);
    }
  };

  getDeviceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params["deviceId"]) as number;
      const device = await this.deviceService.getDeviceById(id);
      if (!device) {
        return next(new AppError("Không thể tìm thấy thiết bị", 404));
      }
      return res.status(201).json({
        message: "success",
        device
      })
    } catch (err) {
      next(err);
    }
  };

  deleteDeviceById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.params["deviceId"]) as number;
      await this.deviceService.deleteDeviceById(id);
      return res.status(200).json({
        message: "Delete device successfully",
      });
    } catch (err) {
      next(err);
    }
  };

  addDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deviceName = req.body["device_name"] as string;
      const devicePrice = req.body["device_price"] as number;
      const roomId = req.body["room_id"] as number | undefined;
      const deviceImage = req.body["device_image"] as string[] | undefined;
      const categoryId = req.body["category_id"] as number | undefined;
      await this.deviceService.addDevice(
        deviceName,
        devicePrice,
        categoryId,
        deviceImage,
        roomId
      );
      return res.status(201).json({
        message: "add device successfuly",
      });
    } catch (err) {
      next(err);
    }
  };
}
