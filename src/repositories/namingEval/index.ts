import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import {
  NamingEval,
  NamingEvalWillEdit,
  NamingEvalWillSubmit,
} from "../../models/namingEval";
import { firestoreClient } from "../../services/firebaseOnServer";
import { INamingEvalRepository } from "./interface";

class NamingEvalRepository implements INamingEvalRepository {
  private readonly collectionName = "NamingEval";

  private toModel(
    snapshot: DocumentSnapshot | QueryDocumentSnapshot,
  ): NamingEval {
    const document = snapshot.data();
    if (!document) {
      throw Error("Document not found!");
    }
    return {
      id: snapshot.id,
      ...document,
    } as NamingEval;
  }

  public async get(id: string): Promise<NamingEval> {
    const document = await firestoreClient
      .collection(this.collectionName)
      .doc(id)
      .get();
    return this.toModel(document);
  }

  public async listByUserOfTarget(
    targetId: string,
    authorId: string,
  ): Promise<NamingEval[]> {
    const query = firestoreClient
      .collection(this.collectionName)
      .where("targetId", "==", targetId)
      .where("authorId", "==", authorId);
    const querySnapshots = await query.get();
    return querySnapshots.docs.map((s) => this.toModel(s));
  }

  public async create(entity: NamingEvalWillSubmit): Promise<NamingEval> {
    const collectionRef = firestoreClient.collection(this.collectionName);
    const values = {
      ...entity,
      isCancelled: false,
    };
    await collectionRef.add(values);
    return {
      id: collectionRef.id,
      ...values,
    };
  }

  public async update(entity: NamingEvalWillEdit): Promise<NamingEval> {
    const namingEval = await this.get(entity.id);
    const docRef = firestoreClient.doc(`${this.collectionName}/${entity.id}`);
    const isCancelled = !namingEval.isCancelled;
    docRef.set(
      {
        ...namingEval,
        isCancelled,
      },
      { merge: true },
    );
    return {
      ...namingEval,
      isCancelled,
    };
  }
}

const namingEvalRepository: INamingEvalRepository = new NamingEvalRepository();
export default namingEvalRepository;
