import { RentalRecord } from "../../models/RentalRecord";

export interface IRentalRecordService {
  createRentalRecord(
    checkInDate: Date,
    checkOutDate: Date,
    roomId: number,
    renterId: number
  ): Promise<RentalRecord>;
  updateRentalRecordByRoomId(
    roomId: number,
    rentalRecord: RentalRecord
  ): Promise<RentalRecord>;
  updateRentalRecordByRenterId(
    renterId: number,
    rentalRecord: RentalRecord
  ): Promise<RentalRecord>;
  deleteRentalRecord(id: number): Promise<boolean>;
}
