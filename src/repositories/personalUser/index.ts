import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { PersonalUser } from "../../models/personalUser";
import { firestoreClient } from "../../services/firebaseOnServer";
import imageRepository from "../image/firebase";
import { IPersonalUserRepository } from "./interface";

class PersonalUserRepository implements IPersonalUserRepository {
  private toModel(
    snapshot: DocumentSnapshot | QueryDocumentSnapshot,
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

  public async get(id: string): Promise<PersonalUser | undefined> {
    const docRef = firestoreClient.doc(`PersonalUser/${id}`);
    const personalUser: PersonalUser = this.toModel(await docRef.get());
    return personalUser.isDeleted ? undefined : personalUser;
  }

  public async create(entity: PersonalUser): Promise<void> {
    const values: PersonalUser = {
      ...entity,
      isDeleted: false,
    };
    const docRef = firestoreClient.doc(`PersonalUser/${entity.id}`);
    const document = await docRef.get();
    if (document.exists) {
      docRef.set(values, { merge: true });
      return;
    }
    docRef.create(values);
  }

  public async update(entity: PersonalUser): Promise<void> {
    const { id, ...params } = entity;
    const docRef = firestoreClient.doc(`PersonalUser/${id}`);
    docRef.set(params, { merge: true });
  }

  public async anonymize(authorId: string): Promise<void> {
    // TODO(Niccari): split imageRepository procedure
    const personalUser = await personalUserRepository.get(authorId);
    if (!personalUser) {
      return;
    }
    if (personalUser.iconImageId) {
      try {
        await imageRepository.delete(personalUser.iconImageId);
      } catch (e) {
        console.error(e);
      }
    }
    const docRef = firestoreClient.doc(`PersonalUser/${authorId}`);
    docRef.set(
      {
        userId: "",
        name: "",
        iconImageId: null,
        profile: null,
        url: null,
        twitterUserId: null,
        isDeleted: true,
      },
      { merge: true },
    );
  }
}

const personalUserRepository: IPersonalUserRepository =
  new PersonalUserRepository();
export default personalUserRepository;
