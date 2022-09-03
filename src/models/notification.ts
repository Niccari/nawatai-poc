export const NotificationKind = {
  RECEIVED_NAME: "receivedName",
  RECEIVED_EVAL: "receivedEval",
} as const;
export type NotificationKind =
  typeof NotificationKind[keyof typeof NotificationKind];

export type NotificationWillSubmit = {
  reactionKind: NotificationKind;
  targetId: string;
  namingId?: string;
  fromAuthorId: string;
  toAuthorId: string;
};

export interface NotificationWithoutId extends NotificationWillSubmit {
  createdAt: Date;
}

export interface Notification extends NotificationWithoutId {
  id: string;
}

export interface NotificationForView {
  id: string;
  createdAt: Date;
  reactionKind: NotificationKind;
  targetId: string;
  namingId?: string;
  fromAuthorId: string;
  message: string;
  authorIconUrl?: string;
}
