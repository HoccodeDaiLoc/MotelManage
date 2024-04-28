import { BaseInterface } from "./BaseInterface";

import { Room } from "../../models/Room";

export interface IRoomRepository extends BaseInterface {
    getAllRooms(): Promise<Room[]>;
    getRoomById(id: string): Promise<Room | null>;
    deleteRoomById(id: string): Promise<void>;
    createRoom(roomNumber: number, price: number, roomArea: number, roomStatus: string | undefined): Promise<void>;
    filterRoomByPrice(leftPrice: number, rightPrice: number): Promise<Room[]>;
}
