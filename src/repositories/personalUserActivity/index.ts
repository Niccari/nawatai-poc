import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import {
  PersonalUserActivity,
  PersonalUserActivityWillEdit,
} from "../../models/personalUserActivity";
import { firestoreClient } from "../../services/firebaseOnServer";
import { IPersonalUserActivityRepository } from "./interface";

class PersonalUserRepository implements IPersonalUserActivityRepository {
  private readonly collectionName = "PersonalUserActivity";

  private toModel(
    snapshot: DocumentSnapshot | QueryDocumentSnapshot
  ): PersonalUserActivity {
    const document = snapshot.data();
    if (!document) {
      throw Error("Document not found!");
    }
    return {
      id: snapshot.id,
      signUpAt: document["signUpAt"].toDate(),
      lastReadNotificationAt: document["lastReadNotificationAt"].toDate(),
    } as PersonalUserActivity;
  }

  public async get(id: string): Promise<PersonalUserActivity> {
    const docRef = firestoreClient.doc(`${this.collectionName}/${id}`);
    return this.toModel(await docRef.get());
  }

  public async create(id: string): Promise<void> {
    const docRef = firestoreClient.doc(`${this.collectionName}/${id}`);
    const values: PersonalUserActivity = {
      id,
      signUpAt: new Date(),
      lastReadNotificationAt: new Date(),
    };
    docRef.create(values);
  }

  public async update(entity: PersonalUserActivityWillEdit): Promise<void> {
    const { id, ...params } = entity;
    const docRef = firestoreClient.doc(`${this.collectionName}/${id}`);
    docRef.set(params, { merge: true });
  }

  public async anonymize(authorId: string): Promise<void> {
    const docRef = firestoreClient.doc(`${this.collectionName}/${authorId}`);
    docRef.set(
      {
        lastReadNotificationAt: new Date(0),
        signUpAt: new Date(0),
      },
      { merge: true }
    );
  }
}

const personalUserRepository: IPersonalUserActivityRepository =
  new PersonalUserRepository();
export default personalUserRepository;
