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
  getUploadWriteStream(): Promise<ImageUploading>;
  setMetaData(id: string, metadata: ImageMetadata): Promise<void>;
}
