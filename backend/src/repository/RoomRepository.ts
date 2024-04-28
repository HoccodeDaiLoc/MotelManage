import { Service } from "typedi";
import { Room } from "../models/Room";
import { BaseRepository } from "./BaseRepository";
import { IRoomRepository } from "./Interfaces/IRoomRepository";
import { RoomImage } from "../models/RoomImage";
import { Image } from "../models/Image";
import { Op } from "sequelize";

@Service()
export class RoomRepository
  extends BaseRepository<Room>
  implements IRoomRepository
{
  constructor() {
    super(Room);
  }

  async getAllRooms(): Promise<Room[]> {
    try {
      const allRooms = await this.model.findAll({
        include: [
          {
            model: RoomImage,
            attributes: ["imageId"],
            include: [
              {
                model: Image,
                attributes: ["imageUrl"],
              },
            ],
          },
        ],
      });
      return allRooms;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getRoomById(id: string): Promise<Room | null> {
    try {
      const room = await this.model.findOne({
        where: { room_id: id },
        include: [
          {
            model: RoomImage,
            attributes: ["imageId"],
            include: [
              {
                model: Image,
                attributes: ["imageUrl"],
              },
            ],
          },
        ],
      });
      return room;
    } catch (err) {
      throw err;
    }
  }

  async deleteRoomById(id: string): Promise<void> {
    try {
      await this.model.destroy({
        where: {
          room_id: id,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async createRoom(
    roomNumber: number,
    price: number,
    roomArea: number,
    roomStatus: string | undefined
  ): Promise<void> {
    try {
      await this.model.create({
        roomNumber: roomNumber,
        price: price,
        roomArea: roomArea,
        roomStatus: roomStatus,
      });
    } catch (err) {
      throw err;
    }
  }

  async filterRoomByPrice(
    leftPrice: number | undefined,
    rightPrice: number
  ): Promise<Room[]> {
    try {
      let whereCondition: any = {};
      if (leftPrice !== undefined && rightPrice !== undefined) {
        whereCondition.price = {
          [Op.between]: [leftPrice, rightPrice],
        };
      } else if (leftPrice !== undefined) {
        whereCondition.price = {
          [Op.gte]: leftPrice,
        };
      } else if (rightPrice !== undefined) {
        whereCondition.price = {
          [Op.lte]: rightPrice,
        };
      }
      const rooms = await this.model.findAll({
        where: whereCondition,
        include: [
          {
            model: RoomImage,
            attributes: ["imageId"],
            include: [
              {
                model: Image,
                attributes: ["imageUrl"],
              },
            ],
          },
        ],
      });
      return rooms;
    } catch (err) {
      throw err;
    }
  }
}
