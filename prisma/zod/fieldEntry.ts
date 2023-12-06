import { FieldEntryType } from "@prisma/client";
import * as z from "zod"

export const FieldEntryInsert = z.object({
  type: z.nativeEnum(FieldEntryType),
  fieldId: z.string().uuid(),
  value: z.string().nullish(),
  decimal: z.number().nullish()
});

export const FieldEntryUnionModel = z.discriminatedUnion("type", [
  FieldEntryInsert.extend({
    type: z.literal("BOOLEAN"),
    value: z.undefined(),
    decimal: z.undefined()
  }),
  FieldEntryInsert.extend({
    type: z.literal("NUMERIC"),
    value: z.undefined(),
    decimal: z.number()
  }),
  FieldEntryInsert.extend({
    type: z.literal("STRING"),
    value: z.string(),
    decimal: z.undefined()
  }),
]);

export type FieldEntry = z.infer<typeof FieldEntryUnionModel>;



