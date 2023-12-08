import * as z from "zod"
import { FieldType } from "@prisma/client"

export const FieldModelInsert = z.object({
  id: z.string(),
  type: z.nativeEnum(FieldType),
  index: z.number().int(),
  data: z.record(z.string()),
  parentId: z.string().nullish(),
});

export const FieldModel = FieldModelInsert.extend({
  formId: z.string(),
})

export type FieldInsert = z.infer<typeof FieldModelInsert>

export type ChildlessField = z.infer<typeof FieldModel>

export interface CompleteField extends z.infer<typeof FieldModel> {
  children: ChildlessField[]
}

/**
 * RelatedFieldModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFieldModel: z.ZodSchema<CompleteField> = z.lazy(() => FieldModel.extend({
  children: FieldModel.array(),
}))
