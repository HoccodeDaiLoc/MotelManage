import { Service, Inject } from "typedi";
import { Contract } from "../models/Contract";
import { IContractService } from "./Interfaces/IContractService";
import { ContractRepository } from "../repository/ContractRepository";
import { IContractRepository } from "../repository/Interfaces/IContractRepository";
import { AppError } from "../errors/AppError";

@Service()
export class ContractService implements IContractService {
  @Inject(() => ContractRepository)
  contractRepository!: IContractRepository;

  async getAllContracts(limit: number, page: number): Promise<Contract[]> {
    try {
      return this.contractRepository.getAll(limit, page);
    } catch (err) {
      throw err;
    }
  }

  async getContractById(id: number): Promise<Contract | null> {
    try {
      return this.contractRepository.getById(id);
    } catch (err) {
      throw err;
    }
  }

  getOneContract(searchConditions: any): Promise<Contract | null> {
    try {
      return this.contractRepository.getOne(searchConditions);
    } catch (err) {
      throw err;
    }
  }

  async updateContractById(id: number, contract: Contract): Promise<Contract> {
    try {
      if (!(await this.contractRepository.getById(id))) {
        throw new AppError("Contract not found", 404);
      }
      const contractNew = await this.contractRepository.updateById(id, contract);
      return contractNew!;
    } catch (err) {
      throw err;
    }
  }

  deleteContractById(id: number): Promise<boolean> {
    try {
      return this.contractRepository.deleteById(id);
    } catch (err) {
      throw err;
    }
  }

  createContract(contract: any): Promise<Contract> {
    try {
      const {
        startDay,
        endDate,
        rentAmount,
        depositAmount,
        roomId,
        renterId,
      } = contract;
      return this.contractRepository.create(
        startDay,
        endDate,
        rentAmount,
        depositAmount,
        roomId,
        renterId
      );
    } catch (err) {
      throw err;
    }
  }
}
