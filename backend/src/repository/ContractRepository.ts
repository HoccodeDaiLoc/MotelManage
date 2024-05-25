import { Contract } from "../models/Contract";
import { BaseRepository } from "./BaseRepository";
import { IContractRepository } from "./Interfaces/IContractRepository";

export class ContractRepository
  extends BaseRepository<Contract>
  implements IContractRepository
{
  async create(
    name: string,
    startDate: Date,
    endDate: Date | undefined,
    rentAmount: number,
    deposit_amount: number | undefined,
    roomId: number,
    renterId: number
  ): Promise<Contract> {
    try {
      return Contract.create({
        name,
        startDate,
        endDate,
        rentAmount,
        deposit_amount,
        roomId,
        renterId,
      });
    } catch (err) {
      throw err;
    }
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      const deletedContract = await Contract.destroy({
        where: {
          id: id,
        },
      });
      return deletedContract ? true : false;
    } catch (err) {
      throw err;
    }
  }

  async getAll(): Promise<Contract[]> {
    try {
      return await Contract.findAll();
    } catch (err) {
      throw err;
    }
  }

  async getById(id: string): Promise<Contract | null> {
    try {
      return await Contract.findOne({
        where: {
          id: id,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async getOne(searchConditions: any): Promise<Contract | null> {
    try {
      return await Contract.findOne({
        where: searchConditions,
      });
    } catch (err) {
      throw err;
    }
  }

  async updateById(id: string, contract: Contract): Promise<Contract | null> {
    try {
      await Contract.update(contract, {
        where: {
          id: id,
        },
      });
      return await this.getById(id);
    } catch (err) {
      throw err;
    }
  }
}
