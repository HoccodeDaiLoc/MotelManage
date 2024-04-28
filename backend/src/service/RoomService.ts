import { Inject, Service } from "typedi";
import { IRoomService } from "./Interfaces/IRoomService";
import { RoomRepository } from "../repository/RoomRepository";
import { IRoomRepository } from "../repository/Interfaces/IRoomRepository";

import { Room } from "../models/Room";

@Service()
export class RoomSevice implements IRoomService {
    @Inject(() => RoomRepository)
    private roomRepository!: IRoomRepository;

    async getAllRooms(): Promise<Room[] | null> {
        try {
            return await this.roomRepository.getAllRooms();
        } catch (err){
            throw err;
        }
    }

    async getRoomById(id: string): Promise<Room | null> {
        try {
            return await this.roomRepository.getRoomById(id);
        }catch(err) {
            throw err;
        }
    }

    async deleteRoomById(id: string): Promise<void> {
        try {
            await this.roomRepository.deleteRoomById(id);
        }catch (err) {
            throw err;
        }
    }

    async addRoom(roomNumber: number, price: number, roomArea: number, roomStatus: undefined | string) : Promise<void> {
        try {
            await this.roomRepository.createRoom(roomNumber, price, roomArea, roomStatus);
        } catch(err) {
            throw err;
        }
    }

    async filterRoomByPrice(leftPrice: number, rightPrice: number): Promise<Room[]> {
        try {
            const rooms = this.roomRepository.filterRoomByPrice(leftPrice, rightPrice);
            return rooms;
        }catch(err) {
            throw err;
        }
    }
}