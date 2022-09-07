import { Writable } from "stream";

export type ImageUploading = {
  id: string;
  writable: Writable;
};

export type ImageMetadata = {
  cacheControl?: string;
  contentType?: string;
};

export interface IImageRepository {
  resolveUrl(id: string): Promise<string>;
  delete(id: string): Promise<void>;
  getUploadWriteStream(): Promise<ImageUploading>;
  setMetaData(id: string, metadata: ImageMetadata): Promise<void>;
  makePublic(id: string): Promise<void>;
}
