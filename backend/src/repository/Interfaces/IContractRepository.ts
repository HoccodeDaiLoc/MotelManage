import { Contract } from "../../models/Contract";

export interface IContractRepository {
  getOne(searchConditions: any): Promise<Contract | null>;
  getById(id: string): Promise<Contract | null>;
  getAll(): Promise<Contract[]>;
  create(
    name: string,
    startDate: Date,
    endDate: Date | undefined,
    rentAmount: number,
    deposit_amount: number | undefined,
    roomId: number,
    renterId: number
  ): Promise<Contract>;
  updateById(id: string, contract: Contract): Promise<Contract | null>;
  deleteById(id: string): Promise<boolean>;
}
