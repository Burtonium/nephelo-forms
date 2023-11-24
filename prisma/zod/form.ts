import * as z from "zod"
import { type CompleteField, RelatedFieldModel, type CompleteUser, RelatedUserModel } from "./index"

export const FormInsertModel = z.object({
  id: z.string(),
  createdById: z.string().nullish(),
});

export type FormInsert = z.infer<typeof FormInsertModel>;

export const FormModel = FormInsertModel.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdById: z.string().nullish(),
})

export interface CompleteForm extends z.infer<typeof FormModel> {
  fields: CompleteField[]
  createdBy?: CompleteUser | null
}

/**
 * RelatedFormModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFormModel: z.ZodSchema<CompleteForm> = z.lazy(() => FormModel.extend({
  fields: RelatedFieldModel.array(),
  createdBy: RelatedUserModel.nullish(),
}))
