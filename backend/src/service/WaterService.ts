import { Inject, Service } from "typedi";
import { IWaterService } from "./Interfaces/IWaterService";
import { WaterRepository } from "../repository/WaterRepository";
import { IWaterRepository } from "../repository/Interfaces/IWaterRepository";
import { WaterMeterReading } from "../models/WaterMeterReading";
import { AppError } from "../errors/AppError";

@Service()
export class WaterService implements IWaterService {
  @Inject(() => WaterRepository)
  private waterRepository!: IWaterRepository;

  async addWaterReading(
    waterNumber: number,
    date: Date,
    roomId: number
  ): Promise<void> {
    try {
      await this.waterRepository.createWaterReading(waterNumber, date, roomId);
    } catch (err) {
      throw err;
    }
  }

  async getWaterReadingById(id: number): Promise<WaterMeterReading> {
    try {
      const waterReading = await this.waterRepository.getWaterReadingById(id);
      if(!waterReading) {
        throw new AppError("Water reading not found", 404);
      }
      return waterReading;
    }catch(err) {
      throw err;
    }
  }

  async getWaterReadingByRoomIdAndDate(roomId: number, date: Date): Promise<WaterMeterReading> {
    try {
      const waterReading = await this.waterRepository.getWaterReadingByRoomIdAndDate(roomId, date);
      if(!waterReading) {
        throw new AppError("Water reading not found", 404);
      }
      return waterReading;
    }catch(err) {
      throw err;
    }
  }

  async getLastestWaterReading(roomId: number): Promise<WaterMeterReading> {
    try {
      const waterReading = await this.waterRepository.getLatestWaterReading(roomId);
      if(!waterReading) {
        throw new AppError("Water reading not found", 404);
      }
      return waterReading;
    }catch(err) {
      throw err;
    }
  }
}
