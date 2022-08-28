import { storageClient } from "../../services/firebaseOnServer";
import { IImageRepository, ImageMetadata, ImageUploading } from "./interface";

class ImageRepository implements IImageRepository {
  resolveUrl(id: string): Promise<string> {
    const bucket = storageClient.bucket();
    const file = bucket.file(`images/${id}`);
    const url = file.publicUrl();
    return Promise.resolve(url);
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
    file.setMetadata(metadata);
  }
}

const imageRepository: IImageRepository = new ImageRepository();
export default imageRepository;
