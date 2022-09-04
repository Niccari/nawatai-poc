import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { PersonalUser } from "../../models/personalUser";
import { firestoreClient } from "../../services/firebaseOnServer";
import { IPersonalUserRepository } from "./interface";

class PersonalUserRepository implements IPersonalUserRepository {
  private toModel(
    snapshot: DocumentSnapshot | QueryDocumentSnapshot
  ): PersonalUser {
    const document = snapshot.data();
    if (!document) {
      throw Error("Document not found!");
    }
    return {
      id: snapshot.id,
      ...document,
    } as PersonalUser;
  }

  public async get(id: string): Promise<PersonalUser> {
    const docRef = firestoreClient.doc(`PersonalUser/${id}`);
    return this.toModel(await docRef.get());
  }

  public async create(entity: PersonalUser): Promise<void> {
    const { id, ...params } = entity;
    const values: PersonalUser = {
      id,
      ...params,
    };
    const docRef = firestoreClient.doc(`PersonalUser/${id}`);
    docRef.create(values);
  }

  public async update(entity: PersonalUser): Promise<void> {
    const { id, ...params } = entity;
    const docRef = firestoreClient.doc(`PersonalUser/${id}`);
    docRef.set(params, { merge: true });
  }

  anonymize(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

const personalUserRepository: IPersonalUserRepository =
  new PersonalUserRepository();
export default personalUserRepository;
