import { Notification } from "../../models/Notification";

export interface INotificationService {
    getListNotification(
        searchCondidate: any,
        limit: number,
        page: number
    ): Promise<Notification[]>;
    getNotification(searchCondidate: any): Promise<Notification>;
    createNotification(
        title: string,
        content: string,
        dateCreated: Date,
        subjects: number[],
        isRead: boolean | undefined
    ): Promise<Notification>;
}