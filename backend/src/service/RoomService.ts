import { Inject, Service } from "typedi";
import { IRoomService } from "./Interfaces/IRoomService";
import { RoomRepository } from "../repository/RoomRepository";
import { IRoomRepository } from "../repository/Interfaces/IRoomRepository";

import { Room } from "../models/Room";
import { ImageRepository } from "../repository/ImageRepository";
import { IImageRepository } from "../repository/Interfaces/IImageRepository";
import { RoomImageRepository } from "../repository/RoomImageRepository";
import { IRoomImageRepository } from "../repository/Interfaces/IRoomImageRepository";

@Service()
export class RoomSevice implements IRoomService {
  @Inject(() => RoomRepository)
  private roomRepository!: IRoomRepository;

  @Inject(() => ImageRepository)
  private imageRepository!: IImageRepository;

  @Inject(() => RoomImageRepository)
  private roomImageRepository!: IRoomImageRepository;

  async getAllRooms(page: number, limit: number): Promise<Room[] | null> {
    try {
      return await this.roomRepository.getAllRooms(page, limit);
    } catch (err) {
      throw err;
    }
  }

  async getRoomById(id: number): Promise<Room | null> {
    try {
      return await this.roomRepository.getRoomById(id);
    } catch (err) {
      throw err;
    }
  }

  async getRoomByDeviceCategory(categoryId: number, limit: number, offset: number): Promise<{ rows: Room[]; count: number; }> {
    try {
      const rooms = await this.roomRepository.getRoomByDeviceCategory(categoryId, limit, offset);
      return rooms;
    }catch(err) {
      throw err;
    }
  }

  async deleteRoomById(id: number): Promise<void> {
    try {
      await this.roomRepository.deleteRoomById(id);
    } catch (err) {
      throw err;
    }
  }

  async addRoom(
    roomNumber: number,
    description: string,
    price: number,
    roomArea: number,
    max_occupancy: number,
    roomStatus: undefined | string,
    images: string[] | undefined
  ): Promise<void> {
    try {
      const room = await this.roomRepository.createRoom(
        roomNumber,
        description,
        price,
        roomArea,
        max_occupancy,
        roomStatus
      );
      if (images) {
        const imagesObject = await Promise.all(
          images.map(async (url) => {
            return await this.imageRepository.createImage(url);
          })
        );
        const roomImagePromises = imagesObject.map((image) => {
          return this.roomImageRepository.createRoomImage(
            room.roomId,
            image.imageID
          );
        });
        await Promise.all(roomImagePromises);
      }
    } catch (err) {
      throw err;
    }
  }

  async filterRoomByPrice(
    leftPrice: number,
    rightPrice: number
  ): Promise<Room[]> {
    try {
      const rooms = this.roomRepository.filterRoomByPrice(
        leftPrice,
        rightPrice
      );
      return rooms;
    } catch (err) {
      throw err;
    }
  }

  async getNumberRoom(): Promise<number> {
    try {
      const total = await this.roomRepository.getNumberRoom();
      return total;
    }catch(err) {
      throw err;
    }
  }

  async updateRoomById(
    roomId: string,
    newData: any
  ): Promise<Room> {
    try {
      const room = await this.roomRepository.updateRoomById(
        roomId,
        newData
      );
      return room!;
    } catch (err) {
      throw err;
    }
  }
}
