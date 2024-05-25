import { WaterMeterReading } from "../models/WaterMeterReading";
import { BaseRepository } from "./BaseRepository";
import { IWaterRepository } from "./Interfaces/IWaterRepository";

export class WaterRepository
  extends BaseRepository<WaterMeterReading>
  implements IWaterRepository
{
  async createWaterReading(
    waterNumber: number,
    roomId: number
  ): Promise<WaterMeterReading> {
    try {
        const waterReading = await this.model.create({
            electricNumber: waterNumber,
            roomId: roomId
        });
        return waterReading;
    } catch (err) {
      throw err;
    }
  }
}
