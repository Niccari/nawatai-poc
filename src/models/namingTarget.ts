export type NamingTargetWithoutId = {
  authorId: string;
  title?: string;
  imageId?: string;
  comment: string;
  createdAt: Date;
};

export interface NamingTarget extends NamingTargetWithoutId {
  id: string;
}

export type NamingTargetForView = {
  id: string;
  authorId: string;
  title?: string;
  comment: string;
  imageUrl?: string;
};
