import { storageClient } from "../../services/firebaseOnServer";
import { IImageRepository, ImageMetadata, ImageUploading } from "./interface";

class ImageRepository implements IImageRepository {
  public async resolveUrl(id: string): Promise<string> {
    const bucket = storageClient.bucket();
    const file = bucket.file(`images/${id}`);
    const url = file.publicUrl();
    return url;
  }

  public async delete(id: string): Promise<void> {
    const bucket = storageClient.bucket();
    const file = bucket.file(`images/${id}`);
    await file.delete();
  }

  public async getUploadWriteStream(): Promise<ImageUploading> {
    const bucket = storageClient.bucket();
    const id = Math.random().toString(32).slice(2);
    const uploadFile = bucket.file(`images/${id}`);
    const writable = uploadFile.createWriteStream();
    return {
      id,
      writable,
    };
  }

  async setMetaData(id: string, metadata: ImageMetadata): Promise<void> {
    const bucket = storageClient.bucket();
    const file = bucket.file(`images/${id}`);
    try {
      await file.setMetadata(metadata);
    } catch (e) {
      console.log(e);
    }
  }

  async makePublic(id: string): Promise<void> {
    const bucket = storageClient.bucket();
    const file = bucket.file(`images/${id}`);
    await file.makePublic();
  }
}

const imageRepository: IImageRepository = new ImageRepository();
export default imageRepository;
