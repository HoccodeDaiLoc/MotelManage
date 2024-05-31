import { WaterMeterReading } from "../../models/WaterMeterReading";
import { BaseInterface } from "./BaseInterface";

export interface IWaterRepository extends BaseInterface {
  createWaterReading(
    waterNumber: number,
    date: Date,
    roomId: number
  ): Promise<WaterMeterReading>;
  getWaterReadingById(id: number): Promise<WaterMeterReading | null>;
  getWaterReadingByRoomIdAndDate(roomId: number, date: Date): Promise<WaterMeterReading | null>;
  getLatestElectricReading(roomId: number): Promise<WaterMeterReading | null>;
}
