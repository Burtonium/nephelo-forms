import * as z from "zod"
import { type User, type CompleteForm, UserModel, RelatedFormModel } from "./index"
import { type FieldEntry, FieldEntryUnionModel } from "./fieldEntry";

export const FormEntryInsert = z.object({
  userId: z.string().nullish(),
  formId: z.string().uuid()
});

export type FormEntryInsert = z.infer<typeof FormEntryInsert>;

export const FormEntryModel = FormEntryInsert.extend({
  id: z.string(),
  createdAt: z.date(),
});

export interface CompleteFormEntry extends z.infer<typeof FormEntryModel> {
  form: CompleteForm
  user?: User | null,
  fieldEntries: FieldEntry[],
}

/**
 * RelatedFormModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFormEntryModel: z.ZodSchema<CompleteFormEntry> = z.lazy(() => FormEntryModel.extend({
  fieldEntries: FieldEntryUnionModel.array(),
  user: UserModel.nullish(),
  form: RelatedFormModel,
}))
