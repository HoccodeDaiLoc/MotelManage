import { Bill } from "../../models/Bill";

export interface IBillService {
  createBill(
    billStartDate: Date,
    billEndDate: Date,
    payMethod: string,
    billStatus: string,
    billItem: any[],
    roomId: number
  ): Promise<Bill>;
  getBill(searchCondidate: any): Promise<Bill>;
  getBillByRenter(renterId: number, status: string, limit: number, page: number): Promise<{rows: Bill[], count: number}>;
  getBillByRoom(roomId: number, status: string, limit: number, page: number): Promise<{rows: Bill[], count: number}>;
  updateBillById(billId: number, data: any): Promise<Bill>;
  deleteBillById(billId: number): Promise<boolean>;
}
