import { BaseInterface } from "./BaseInterface";

export interface INotificationSubjectRepository extends BaseInterface{
    createNotificationSubject(userId: number, notificationId: number): Promise<void>;
}