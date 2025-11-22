import { z } from "zod";
import { NamingEvalKind } from "../../models/namingEval";

// Naming関連のスキーマ
export const namingSubmitSchema = z.object({
  authorId: z.string().min(1),
  targetId: z.string().min(1),
  name: z.string().min(1).max(100),
  reason: z.string().max(500).optional(),
});

export const namingEditSchema = z.object({
  id: z.string().min(1),
  reason: z.string().max(500).optional(),
  evalCounts: z.record(z.number()).optional(),
  totalEvalCounts: z.number().optional(),
});

// NamingTarget関連のスキーマ
export const namingTargetSubmitSchema = z.object({
  authorId: z.string().min(1),
  title: z.string().max(100).optional(),
  imageId: z.string().optional(),
  comment: z.string().max(1000),
});

export const namingTargetEditSchema = z.object({
  id: z.string().min(1),
  comment: z.string().max(1000).optional(),
  evalCounts: z.record(z.number()).optional(),
  totalEvalCounts: z.number().optional(),
});

// NamingEval関連のスキーマ
export const namingEvalSubmitSchema = z.object({
  targetId: z.string().min(1),
  namingId: z.string().min(1),
  authorId: z.string().min(1),
  kind: z.enum([
    NamingEvalKind.PRECISE,
    NamingEvalKind.FUN,
    NamingEvalKind.QUESTION,
    NamingEvalKind.MISSMATCH,
  ]),
});

export const namingEvalEditSchema = z.object({
  id: z.string().min(1),
  targetId: z.string().min(1),
  namingId: z.string().min(1),
  authorId: z.string().min(1),
  kind: z.enum([
    NamingEvalKind.PRECISE,
    NamingEvalKind.FUN,
    NamingEvalKind.QUESTION,
    NamingEvalKind.MISSMATCH,
  ]),
});

// PersonalUser関連のスキーマ
export const personalUserSchema = z.object({
  id: z.string().min(1),
  userId: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[0-9a-zA-Z-_]*$/),
  name: z.string().min(1).max(50),
  iconImageId: z.string().optional(),
  profile: z.string().max(500),
});
