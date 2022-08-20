import { Writable } from "stream";
import { storageClient } from "../../services/firebaseOnServer";
import { IImageRepository } from "./interface";

class ImageRepository implements IImageRepository {
  resolveUrl(id: string): Promise<string> {
    const bucket = storageClient.bucket();
    const file = bucket.file(`images/${id}`);
    const url = file.publicUrl();
    return Promise.resolve(url);
  }

  public async getUploadWriteStream(): Promise<{
    id: string;
    writable: Writable;
  }> {
    const bucket = storageClient.bucket();
    const id = Math.random().toString(32).slice(2);
    const uploadFile = bucket.file(id);
    const writable = uploadFile.createWriteStream({
      metadata: {
        cacheControl: "public,max-age=300,s-maxage=300",
      },
    });
    return {
      id,
      writable,
    };
  }
}

const imageRepository: IImageRepository = new ImageRepository();
export default imageRepository;
