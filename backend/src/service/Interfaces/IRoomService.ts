import { Room } from "../../models/Room";

export interface IRoomService {
  getAllRooms(): Promise<Room[] | null>;
  getRoomById(id: string): Promise<Room | null>;
  deleteRoomById(id: string): Promise<void>;
  addRoom(
    roomNumber: number,
    price: number,
    roomArea: number,
    roomStatus: undefined | string
  ): Promise<void>;
  filterRoomByPrice(leftPrice: number, rightPrice: number): Promise<Room[]>;
}
