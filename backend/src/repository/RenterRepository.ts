import { Service } from "typedi";
import { Renter } from "../models/Renter";
import { BaseRepository } from "./BaseRepository";
import { IRenterRepository } from "./Interfaces/IRenterRepository";

@Service()
export class RenterRepository
  extends BaseRepository<Renter>
  implements IRenterRepository
{
  async getAllRenter(page: number, limit: number): Promise<Renter[]> {
    try {
      const offsetvalue = (page - 1) * limit;
      const renterList = await Renter.findAll({
        limit: limit,
        offset: offsetvalue,
      });
      return renterList;
    } catch (err) {
      throw err;
    }
  }

  async getRenterById(id: number): Promise<Renter | null> {
    try {
      const renter = await Renter.findOne({
        where: {
          renter_id: id,
        },
      });
      return renter;
    } catch (err) {
      throw err;
    }
  }

  async deleteRenterById(id: number): Promise<void> {
    try {
      await Renter.destroy({
        where: {
          renter_id: id,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async createRenter(
    name: string | undefined,
    dateOfBirth: Date | undefined,
    address: string | undefined,
    phone: string | undefined,
    email: string | undefined,
    cccd: string | undefined
  ): Promise<Renter> {
    try {
      const newRenter = await Renter.create({
        name,
        dateOfBirth,
        address,
        phone,
        email,
        cccd,
      });
      return newRenter;
    } catch (err) {
      throw err;
    }
  }

  async getRenterByEmail(email: string): Promise<Renter | null> {
    try {
      return await Renter.findOne({
        where: {
          email: email,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async updateRenterById(id: number, newData: any): Promise<Renter> {
    try {
      await Renter.update(newData, {
        where: {
          renter_id: id,
        },
      });
      const updatedRenter = await Renter.findOne({
        where: {
          renter_id: id,
        },
      });
      return updatedRenter!;
    } catch (err) {
      throw err;
    }
  }
}
