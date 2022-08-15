import { parseISO } from "date-fns";
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import {
  NamingTarget,
  NamingTargetListGenre,
  NamingTargetWithoutId,
} from "../../models/namingTarget";
import { firestoreClient } from "../../services/firebaseOnServer";
import { INamingTargetRepository } from "./interface";

class NamingTargetRepository implements INamingTargetRepository {
  private toModel(
    snapshot: DocumentSnapshot | QueryDocumentSnapshot
  ): NamingTarget {
    const document = snapshot.data();
    if (!document) {
      throw Error("Document not found!");
    }
    return {
      id: snapshot.id,
      authorId: document["authorId"],
      title: document["title"],
      imageId: document["imageId"],
      comment: document["comment"],
      createdAt: parseISO(document["createdAt"]),
    };
  }

  public async get(id: string): Promise<NamingTarget> {
    throw new Error("Method not implemented.");
  }

  public async list(
    count: number,
    genre: NamingTargetListGenre,
    cursorId?: string | undefined
  ): Promise<NamingTarget[]> {
    throw new Error("Method not implemented.");
  }

  public async create(entity: NamingTargetWithoutId): Promise<NamingTarget> {
    const collectionRef = firestoreClient.collection("NamingTargets");
    const docRef = await collectionRef.add(entity);
    return {
      ...entity,
      id: docRef.id,
    };
  }

  public update(entity: NamingTarget): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

const namingTargetRepository: INamingTargetRepository =
  new NamingTargetRepository();
export default namingTargetRepository;
