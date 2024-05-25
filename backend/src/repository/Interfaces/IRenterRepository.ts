import { Renter } from "../../models/Renter";
import { BaseInterface } from "./BaseInterface";

export interface IRenterRepository extends BaseInterface {
  getAllRenter(page: number, limit: number): Promise<Renter[]>;
  getRenterById(id: number): Promise<Renter | null>;
  deleteRenterById(id: number): Promise<void>;
  createRenter(
    name: string | undefined,
    dateOfBirth: Date | undefined,
    address: string | undefined,
    phone: string | undefined,
    email: string | undefined,
    cccd: string | undefined
  ): Promise<Renter>;
  getRenterByEmail(email: string): Promise<Renter | null>;
  updateRenterById(id: number, newData: any): Promise<Renter>;
}
