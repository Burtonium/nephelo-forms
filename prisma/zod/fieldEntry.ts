import { FieldEntryType, Prisma } from "@prisma/client";
import * as z from "zod"

export const FieldEntryInsert = z.object({
  type: z.nativeEnum(FieldEntryType),
  fieldId: z.string().uuid(),
  value: z.string().nullish(),
  decimal: z
  .instanceof(Prisma.Decimal)
  .or(z.number())
  .nullish()
});

export const FieldEntryUnionModel = z.discriminatedUnion("type", [
  FieldEntryInsert.extend({
    type: z.literal("BOOLEAN"),
    value: z.null().or(z.undefined()),
    decimal: z.null().or(z.undefined()),
  }),
  FieldEntryInsert.extend({
    type: z.literal("NUMERIC"),
    value: z.null().or(z.undefined()),
    decimal: z
      .instanceof(Prisma.Decimal)
      .or(z.number())
  }),
  FieldEntryInsert.extend({
    type: z.literal("STRING"),
    value: z.string(),
    decimal: z.null().or(z.undefined()),
  }),
]);

export type FieldEntry = z.infer<typeof FieldEntryUnionModel>;



