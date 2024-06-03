import { Service } from "typedi";
import { NotificationSubject } from "../models/NotificationSubject";
import { BaseRepository } from "./BaseRepository";
import { INotificationSubjectRepository } from "./Interfaces/INotificationSubjectRepository";

@Service()
export class NotificationSubjectRepository
  extends BaseRepository<NotificationSubject>
  implements INotificationSubjectRepository
{
  async createNotificationSubject(
    userId: number,
    notificationId: number
  ): Promise<void> {
    try {
      await NotificationSubject.create({
        userId,
        notificationId,
      });
    } catch (err) {
      throw err;
    }
  }
}
