import { parseISO } from "date-fns";
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { evalCountsInit } from "../../models/namingEval";
import {
  NamingTarget,
  NamingTargetListGenre,
  NamingTargetWillEdit,
  NamingTargetWillSubmit,
} from "../../models/namingTarget";
import { firestoreClient } from "../../services/firebaseOnServer";
import imageRepository from "../image/firebase";
import { INamingTargetRepository } from "./interface";

class NamingTargetRepository implements INamingTargetRepository {
  private readonly collectionName = "NamingTargets";

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
      isDeleted: document["isDeleted"],
    };
  }

  public async get(id: string): Promise<NamingTarget> {
    const document = await firestoreClient
      .collection(this.collectionName)
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
      .collection(this.collectionName)
      .where("isDeleted", "==", false)
      .orderBy(orderKey, "desc")
      .offset(offset)
      .limit(count);
    const querySnapshots = await query.get();
    return querySnapshots.docs.map((s) => this.toModel(s));
  }

  public async create(entity: NamingTargetWillSubmit): Promise<NamingTarget> {
    const collectionRef = firestoreClient.collection(this.collectionName);
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

  public async update(entity: NamingTargetWillEdit): Promise<NamingTarget> {
    const namingTarget = await this.get(entity.id);
    const updateItems = Object.fromEntries(
      Object.entries(entity).filter(([k, v]) => v !== undefined)
    );
    const newTarget = {
      ...namingTarget,
      ...updateItems,
    };
    const docRef = firestoreClient.doc(`${this.collectionName}/${entity.id}`);
    docRef.set(newTarget, { merge: true });
    return newTarget;
  }

  public async delete(id: string): Promise<void> {
    const target = await this.get(id);
    // TODO(Niccari): split imageRepository procedure
    if (target.imageId) {
      try {
        await this.delete(target.imageId);
      } catch (e) {
        console.error(e);
      }
    }
    const docRef = firestoreClient.doc(`${this.collectionName}/${id}`);
    docRef.set(
      {
        title: "",
        comment: "",
        imageId: null,
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
    Promise.all(querySnapshots.docs.map((doc) => this.delete(doc.id)));
  }
}

const namingTargetRepository: INamingTargetRepository =
  new NamingTargetRepository();
export default namingTargetRepository;
