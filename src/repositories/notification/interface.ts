import {
  Notification,
  NotificationWillSubmit,
} from "../../models/notification";

export interface INotificationRepository {
  list(authorId: string): Promise<Notification[]>;
  create(entity: NotificationWillSubmit): Promise<Notification>;
}
