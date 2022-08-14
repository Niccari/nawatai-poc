export const NotificationKind = {
  RECEIVED_NAME: "receivedName",
  RECEIVED_EVAL: "receivedEval",
} as const;
export type NotificationKind =
  typeof NotificationKind[keyof typeof NotificationKind];

export type NotificationWithoutId = {
  reactionKind: NotificationKind;
  reactedModelId: string;
  fromAuthorId: string;
  toAuthorId: string;
  createdAt: Date;
};

export interface Notification extends NotificationWithoutId {
  id: string;
}
