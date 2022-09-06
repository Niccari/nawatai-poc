import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { Naming, NamingWillEdit, NamingWillSubmit } from "../../models/naming";
import { evalCountsInit } from "../../models/namingEval";
import { NamingTargetListGenre } from "../../models/namingTarget";
import { firestoreClient } from "../../services/firebaseOnServer";
import { INamingRepository } from "./interface";

class NamingRepository implements INamingRepository {
  private readonly collectionName = "Naming";

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
    const document = await firestoreClient
      .collection(this.collectionName)
      .doc(id)
      .get();
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
      .collection(this.collectionName)
      .where("isDeleted", "==", false)
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
      isDeleted: false,
    };
    const docRef = await collectionRef.add(values);
    return {
      ...values,
      id: docRef.id,
    };
  }

  public async update(entity: NamingWillEdit): Promise<Naming> {
    const naming = await this.get(entity.id);
    const updateItems = Object.fromEntries(
      Object.entries(entity).filter(([k, v]) => v !== undefined)
    );
    const newNaming = {
      ...naming,
      ...updateItems,
    };
    const docRef = firestoreClient.doc(`${this.collectionName}/${entity.id}`);
    docRef.set(newNaming, { merge: true });
    return newNaming;
  }

  public async delete(id: string): Promise<void> {
    const docRef = firestoreClient.doc(`${this.collectionName}/${id}`);
    docRef.set(
      {
        name: "",
        reason: "",
        isDeleted: true,
      },
      { merge: true }
    );
  }

  public async anonymize(id: string): Promise<void> {
    const query = firestoreClient
      .collection(this.collectionName)
      .where("authorId", "==", id);
    const querySnapshots = await query.get();
    const ids = querySnapshots.docs.map((s) => s.id);
    Promise.all(
      ids.map(async (id) => {
        this.delete(id);
      })
    );
  }
}

const namingRepository: INamingRepository = new NamingRepository();
export default namingRepository;
