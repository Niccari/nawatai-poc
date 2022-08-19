import { parseISO } from "date-fns";
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { evalCountsInit } from "../../models/namingEval";
import {
  NamingTarget,
  NamingTargetListGenre,
  NamingTargetWillSubmit,
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
      createdAt: document["createdAt"],
      evalCounts: document["evalCounts"],
      totalEvalCounts: document["totalEvalCounts"],
    };
  }

  public async get(id: string): Promise<NamingTarget> {
    const document = await firestoreClient
      .collection("NamingTargets")
      .doc(id)
      .get();
    return this.toModel(document);
  }

  public async list(
    count: number,
    genre: NamingTargetListGenre,
    page: number
  ): Promise<NamingTarget[]> {
    const offset = count * Math.max(page - 1, 0);
    const orderKey = (() => {
      switch (genre) {
        case NamingTargetListGenre.HOT:
          return "totalEvalCounts";
        case NamingTargetListGenre.LATEST:
          return "createdAt";
        default:
          return "totalEvalCounts";
      }
    })();
    const query = firestoreClient
      .collection("NamingTargets")
      .orderBy(orderKey, "desc")
      .offset(offset)
      .limit(count);
    const querySnapshots = await query.get();
    return querySnapshots.docs.map((s) => this.toModel(s));
  }

  public async create(entity: NamingTargetWillSubmit): Promise<NamingTarget> {
    const collectionRef = firestoreClient.collection("NamingTargets");
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
