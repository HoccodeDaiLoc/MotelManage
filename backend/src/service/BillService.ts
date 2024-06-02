import { Inject, Service } from "typedi";
import { Bill } from "../models/Bill";
import { IBillService } from "./Interfaces/IBillService";
import { BillRepository } from "../repository/BillRepository";
import { IBillRepository } from "../repository/Interfaces/IBillRepository";
import { BillItem } from "../models/BillItem";
import { BillItemRepository } from "../repository/BillItemRepository";
import { IBillItemRepository } from "../repository/Interfaces/IBillItemRepository";
import { AppError } from "../errors/AppError";
import { RoomRepository } from "../repository/RoomRepository";
import { IRoomRepository } from "../repository/Interfaces/IRoomRepository";
import { ElectricReadingRepository } from "../repository/ElectricReadingRepository";
import { IElectricReadingRepository } from "../repository/Interfaces/IElectricReadingRepository";
import { WaterReadingController } from "../controllers/WaterReadingController";
import { WaterRepository } from "../repository/WaterRepository";
import { IWaterRepository } from "../repository/Interfaces/IWaterRepository";
import { RentalRecordRepository } from "../repository/RentalRecordRepository";
import { IRentalRecordRepository } from "../repository/Interfaces/IRentalRecordRepository";

@Service()
export class BillService implements IBillService {
  @Inject(() => BillRepository)
  private billRepository!: IBillRepository;

  @Inject(() => BillItemRepository)
  private billItemRepository!: IBillItemRepository;

  @Inject(() => RoomRepository)
  private roomRepository!: IRoomRepository;

  @Inject(() => ElectricReadingRepository)
  private electricReadingRepository!: IElectricReadingRepository;

  @Inject(() => WaterRepository)
  private waterRepository!: IWaterRepository;

  @Inject(() => RentalRecordRepository)
  private rentalRecordRepository!: IRentalRecordRepository;

  private async checkBillExist(
    roomId: number,
    billStartDate: Date,
    billEndDate: Date
  ): Promise<boolean> {
    try {
      const bill = await this.billRepository.getBill({
        roomId,
        billStartDate,
        billEndDate,
      });
      return !!bill;
    } catch (err) {
      throw err;
    }
  }

  async createBill(
    billStartDate: Date,
    billEndDate: Date,
    payMethod: string,
    billStatus: string,
    billItem: any[],
    roomId: number
  ): Promise<Bill> {
    let bill: Bill | undefined;
    try {
      if(await this.checkBillExist(roomId, billStartDate, billEndDate)) {
        throw new AppError("Bill already exist", 400);
      }
      bill = await this.billRepository.createBill(
        billStartDate,
        billEndDate,
        0,
        payMethod,
        billStatus,
        roomId
      );

      let total = 0;
      const billItemsObject = await Promise.all(
        billItem.map(async ({ itemName, unitPrice }) => {
          let totalAmont: number = 0;
          let quantity: number = 0;
          if (itemName === "Phòng") {
            const room = await this.roomRepository.getRoomById(roomId);
            if (!room) {
              throw new AppError("Room not found", 404);
            }
            unitPrice = room.price;
            quantity = 1;
            totalAmont = unitPrice;
          } else if (itemName === "Điện") {
            const lastestElectricReading =
              await this.electricReadingRepository.getLatestElectricReading(
                roomId
              );
            if (
              lastestElectricReading &&
              new Date(lastestElectricReading.electricRecordDate).getTime() !==
                billEndDate.getTime()
            ) {
              throw new AppError("Vui lòng nhập số điện tháng này", 404);
            }
            const lastElectricReading =
              await this.electricReadingRepository.getLastElectricReading(
                roomId
              );
            quantity =
              lastestElectricReading!.electricNumber -
              lastElectricReading!.electricNumber;
            totalAmont = quantity * unitPrice;
          } else if (itemName === "Nước") {
            const lastestWaterReading =
              await this.waterRepository.getLastestWaterReading(roomId);
            if (
              lastestWaterReading &&
              new Date(lastestWaterReading.waterRecordDate).getTime() !==
                billEndDate.getTime()
            ) {
              throw new AppError("Vui lòng nhập số nước tháng này", 404);
            }
            const lastWaterReading =
              await this.waterRepository.getLastWaterReading(roomId);
            quantity =
              lastestWaterReading!.waterNumber - lastWaterReading!.waterNumber;
            totalAmont = quantity * unitPrice;
          }
          total += totalAmont;
          await this.billItemRepository.createBillItem(
            itemName,
            quantity,
            unitPrice,
            totalAmont,
            bill!.billId
          );
        })
      );
      const newBill = await this.billRepository.updateBillByID(bill.billId, {
        total,
      });
      return newBill!;
    } catch (err) {
      if (bill) {
        await this.billRepository.deleteBillById(bill.billId);
      }
      throw err;
    }
  }

  async getBill(searchCondidate: any): Promise<Bill> {
    try {
      const bill = await this.billRepository.getBill(searchCondidate);
      if (!bill) {
        throw new AppError("Bill not found", 404);
      }
      return bill;
    } catch (err) {
      throw err;
    }
  }

  async getListBill(searchCondidate: any, limit: number, page: number): Promise<{ rows: Bill[]; count: number; }> {
    try {
      const bills = await this.billRepository.getListBill(searchCondidate, limit, page);
      if (bills?.count === 0) {
        throw new AppError("Bill not found", 404);
      }
      return bills!;
    } catch(err) {
      throw err;
    } 
  }

  async getBillByRenter(
    renterId: number,
    status: string,
    limit: number,
    page: number
  ): Promise<{ rows: Bill[]; count: number }> {
    try {
      const rentalRecord = await this.rentalRecordRepository.getRental({
        renterId: renterId,
      });
      if (!rentalRecord) {
        throw new AppError("Rental record not found", 404);
      }
      const bills = await this.billRepository.getBillWithTimeFrame(
        rentalRecord.checkInDate,
        rentalRecord.checkOutDate,
        status,
        limit,
        page
      );
      if (bills?.count === 0) {
        throw new AppError("Bill not found", 404);
      }
      return bills!;
    } catch (err) {
      throw err;
    }
  }

  async getBillByRoom(
    roomId: number,
    status: string,
    limit: number,
    page: number
  ): Promise<{ rows: Bill[]; count: number }> {
    try {
      const searchCondidate: {
        roomId: number;
        status?: string;
      } = {
        roomId,
      };
      if (status) {
        searchCondidate.status = status;
      }
      const bills = await this.billRepository.getListBill(
        searchCondidate,
        limit,
        page
      );
      if (bills?.count === 0) {
        throw new AppError("Bill not found", 404);
      }
      return bills!;
    } catch (err) {
      throw err;
    }
  }

  async updateBillById(billId: number, data: any): Promise<Bill> {
    try {
      const bill = await this.billRepository.updateBillByID(billId, data);
      if (!bill) {
        throw new AppError("Bill not found", 404);
      }
      return bill!;
    } catch (err) {
      throw err;
    }
  }

  async deleteBillById(billId: number): Promise<boolean> {
    try {
      const bill = await this.billRepository.deleteBillById(billId);
      if (!bill) {
        throw new AppError("Bill not found", 404);
      }
      return true;
    } catch (err) {
      throw err;
    }
  }
}