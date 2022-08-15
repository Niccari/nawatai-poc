export type NamingTargetWillSubmit = {
  authorId: string;
  title?: string;
  imageId?: string;
  comment: string;
};

export interface NamingTargetWithoutId extends NamingTargetWillSubmit {
  createdAt: Date;
}

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

export const NamingTargetListGenre = {
  HOT: "hot",
  LATEST: "latest",
} as const;
export type NamingTargetListGenre =
  typeof NamingTargetListGenre[keyof typeof NamingTargetListGenre];
