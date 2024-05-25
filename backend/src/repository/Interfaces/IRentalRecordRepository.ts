import { RentalRecord } from "../../models/RentalRecord";
import { Renter } from "../../models/Renter";
import { BaseInterface } from "./BaseInterface";

export interface IRentalRecordRepository extends BaseInterface {
  createRentalRecord(
    checkInDate: Date | undefined,
    checkOutDate: Date | undefined,
    roomId: number | undefined,
    renterId: number | undefined
  ): Promise<RentalRecord>;
}
