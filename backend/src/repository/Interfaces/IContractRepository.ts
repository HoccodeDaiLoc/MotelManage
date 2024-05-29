import { Contract } from "../../models/Contract";

export interface IContractRepository {
  getOne(searchConditions: any): Promise<Contract | null>;
  getById(id: number): Promise<Contract | null>;
  getAll(limit: number, page: number): Promise<Contract[]>;
  create(
    startDate: Date,
    endDate: Date | undefined,
    rentAmount: number,
    deposit_amount: number | undefined,
    roomId: number,
    renterId: number
  ): Promise<Contract>;
  updateById(id: number, contract: Contract): Promise<Contract>;
  deleteById(id: number): Promise<boolean>;
}
