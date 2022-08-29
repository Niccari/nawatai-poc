import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { Notification, NotificationWillSubmit, NotificationWithoutId } from "../../models/notification";
import { firestoreClient } from "../../services/firebaseOnServer";
import { INotificationRepository } from "./interface";

class NotificationRepository implements INotificationRepository {
  private readonly collectionName = "Notifications";

  private toModel(
    snapshot: DocumentSnapshot | QueryDocumentSnapshot
  ): Notification {
    const document = snapshot.data();
    if (!document) {
      throw Error("Document not found!");
    }
    return {
      id: snapshot.id,
      ...document,
    } as Notification;
  }

  public async list(authorId: string): Promise<Notification[]> {
    const query = firestoreClient
      .collection(this.collectionName)
      .where("fromAuthorId", "==", authorId)
      .orderBy("createdAt", "desc")
      .limit(5);
    const querySnapshots = await query.get();
    return querySnapshots.docs.map((s) => this.toModel(s));
  }

  public async create(entity: NotificationWillSubmit): Promise<Notification> {
    const collectionRef = firestoreClient.collection(this.collectionName);
    const values: NotificationWithoutId = {
      ...entity,
      createdAt: new Date(),
    };
    const docRef = await collectionRef.add(values);
    return {
      id: docRef.id,
      ...values,
    };
  }
}

const notificationRepository: INotificationRepository =
  new NotificationRepository();
export default notificationRepository;
