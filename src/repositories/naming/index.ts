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
    return {
      id: snapshot.id,
      ...document,
    } as Naming;
  }

  public async get(id: string): Promise<Naming> {
    const document = await firestoreClient.collection("Naming").doc(id).get();
    return this.toModel(document);
  }

  private genreToField = (genre: NamingTargetListGenre) => {
    switch (genre) {
      case NamingTargetListGenre.HOT:
        return "totalEvalCounts";
      case NamingTargetListGenre.LATEST:
        return "createdAt";
      default:
        return "totalEvalCounts";
    }
  };

  public async list(
    count: number,
    genre: NamingTargetListGenre,
    page: number
  ): Promise<Naming[]> {
    const offset = count * Math.max(page - 1, 0);
    const orderKey = this.genreToField(genre);
    const query = firestoreClient
      .collection("Naming")
      .orderBy(orderKey, "desc")
      .offset(offset)
      .limit(count);
    const querySnapshots = await query.get();
    return querySnapshots.docs.map((s) => this.toModel(s));
  }

  public async listByTarget(
    count: number,
    targetId: string,
    genre: NamingTargetListGenre,
    page: number
  ): Promise<Naming[]> {
    const offset = count * Math.max(page - 1, 0);
    const orderKey = this.genreToField(genre);
    const query = firestoreClient
      .collection("Naming")
      .where("targetId", "==", targetId)
      .orderBy(orderKey, "desc")
      .offset(offset)
      .limit(count);
    const querySnapshots = await query.get();
    return querySnapshots.docs.map((s) => this.toModel(s));
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
