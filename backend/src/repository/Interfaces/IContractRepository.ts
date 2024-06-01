import { Contract } from "../../models/Contract";
import { BaseInterface } from "./BaseInterface";

export interface IContractRepository extends BaseInterface{
  getOne(searchConditions: any): Promise<Contract | null>;
  getById(id: number): Promise<Contract | null>;
  getAll(limit: number, page: number): Promise<{rows:Contract[], count: number}>;
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
