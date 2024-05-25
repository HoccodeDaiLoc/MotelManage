import { WaterMeterReading } from "../../models/WaterMeterReading";
import { BaseInterface } from "./BaseInterface";

export interface IWaterRepository extends BaseInterface {
  createWaterReading(
    waterNumber: number,
    roomId: number
  ): Promise<WaterMeterReading>;
}
