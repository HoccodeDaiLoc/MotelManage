import { Service } from "typedi";
import { Image } from "../models/Image";
import { BaseRepository } from "./BaseRepository";
import { IImageRepository } from "./Interfaces/IImageRepository";
import { RentalRecord } from "../models/RentalRecord";
import { IRentalRecordRepository } from "./Interfaces/IRentalRecordRepository";
import { Renter } from "../models/Renter";

@Service()
export class RentalRecordRepository
  extends BaseRepository<RentalRecord>
  implements IRentalRecordRepository
{
  async createRentalRecord(
    checkInDate: Date | undefined,
    checkOutDate: Date | undefined,
    roomId: number | undefined,
    renterId: number | undefined
  ): Promise<RentalRecord> {
    try {
      const newRental = await RentalRecord.create({
        renterId,
        checkInDate,
        checkOutDate,
        roomId,
      });
      return newRental;
    } catch (err) {
      throw err;
    }
  }
}
