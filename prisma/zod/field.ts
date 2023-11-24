import * as z from "zod"
import { FieldType } from "@prisma/client"
import { type CompleteForm, RelatedFormModel } from "./index"

export const FieldModel = z.object({
  id: z.string(),
  type: z.nativeEnum(FieldType),
  index: z.number().int(),
  data: z.record(z.string()),
  formId: z.string(),
  parentId: z.string().nullish(),
});

export type FieldInsert = z.infer<typeof FieldModel>

export interface CompleteField extends z.infer<typeof FieldModel> {
  form: CompleteForm
  children: CompleteField[]
  parent?: CompleteField | null
}

/**
 * RelatedFieldModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFieldModel: z.ZodSchema<CompleteField> = z.lazy(() => FieldModel.extend({
  form: RelatedFormModel,
  children: RelatedFieldModel.array(),
  parent: RelatedFieldModel.nullish(),
}))
