import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase-admin/firestore";
import {
  Notification,
  NotificationWillSubmit,
  NotificationWithoutId,
} from "../../models/notification";
import { firestoreClient } from "../../services/firebaseOnServer";
import { INotificationRepository } from "./interface";

class NotificationRepository implements INotificationRepository {
  private readonly collectionName = "Notifications";

  private toModel(
    snapshot: DocumentSnapshot | QueryDocumentSnapshot,
  ): Notification {
    const document = snapshot.data();
    if (!document) {
      throw Error("Document not found!");
    }
    return {
      id: snapshot.id,
      ...document,
      createdAt: (document["createdAt"] as Timestamp).toDate(),
    } as Notification;
  }

  public async list(authorId: string): Promise<Notification[]> {
    const query = firestoreClient
      .collection(this.collectionName)
      .where("toAuthorId", "==", authorId)
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

  public async anonymize(id: string): Promise<void> {
    const query = firestoreClient
      .collection(this.collectionName)
      .where("toAuthorId", "==", id);
    const querySnapshots = await query.get();
    await Promise.all(
      querySnapshots.docs.map(async (snapshot) => {
        return snapshot.ref.delete();
      }),
    );
  }
}

const notificationRepository: INotificationRepository =
  new NotificationRepository();
export default notificationRepository;
