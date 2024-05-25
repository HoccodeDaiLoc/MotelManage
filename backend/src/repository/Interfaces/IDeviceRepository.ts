import { Device } from "../../models/Device";
import { DeviceCategory } from "../../models/DeviceCategory";
import { BaseInterface } from "./BaseInterface";

export interface IDeviceRepository extends BaseInterface {
  getAllDevice(): Promise<Device[]>;
  getDeviceById(id: number): Promise<Device | null>;
  deleteDeviceById(id: number): Promise<void>;
  createDevice(
    name: string,
    price: number,
    category_id: number | undefined,
    roomId: number | undefined
  ): Promise<Device>;
}
