import { parseISO } from "date-fns";
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { Naming, NamingWillSubmit } from "../../models/naming";
import { evalCountsInit } from "../../models/namingEval";
import { NamingTargetListGenre } from "../../models/namingTarget";
import { firestoreClient } from "../../services/firebaseOnServer";
import { INamingRepository } from "./interface";

class NamingRepository implements INamingRepository {
  private toModel(snapshot: DocumentSnapshot | QueryDocumentSnapshot): Naming {
    const document = snapshot.data();
    if (!document) {
      throw Error("Document not found!");
    }
    return document as Naming;
  }

  public async get(id: string): Promise<Naming> {
    const document = await firestoreClient.collection("Naming").doc(id).get();
    return this.toModel(document);
  }

  public async list(
    count: number,
    targetId: string,
    genre: NamingTargetListGenre,
    page: number
  ): Promise<Naming[]> {
    throw new Error("Method not implemented.");
  }

  public async create(entity: NamingWillSubmit): Promise<Naming> {
    const collectionRef = firestoreClient.collection("Naming");
    const values = {
      ...entity,
      evalCounts: evalCountsInit,
      totalEvalCounts: 0,
      createdAt: new Date(),
    };
    const docRef = await collectionRef.add(values);
    return {
      ...values,
      id: docRef.id,
    };
  }

  public update(entity: Naming): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

const namingRepository: INamingRepository = new NamingRepository();
export default namingRepository;
