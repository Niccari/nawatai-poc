export type PendingImageWithoutId = {
  authorId: string;
  uploadedAt: Date;
  isBinded: boolean;
};

export interface PendingImage extends PendingImageWithoutId {
  id: string;
}
