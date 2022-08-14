export type NamingWithoutId = {
  authorId: string;
  name: string;
  reason?: string;
  createdAt: Date;
  evalCount: number;
};

export interface Naming extends NamingWithoutId {
  id: string;
}
