import { Writable } from "stream";

export type ImageMetadata = {
  cacheControl?: string;
  contentType?: string;
};

export interface IImageRepository {
  resolveUrl(id: string): Promise<string>;
  getUploadWriteStream(): Promise<{ id: string; writable: Writable }>;
  setMetaData(id: string, metadata: ImageMetadata): Promise<void>;
}
