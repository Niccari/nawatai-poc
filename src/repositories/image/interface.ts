import { Writable } from "stream";

export interface IImageRepository {
  resolveUrl(id: string): Promise<string>;
  getUploadWriteStream(): Promise<{ id: string; writable: Writable }>;
}
