import { RelatedFormModel } from "prisma/zod";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const formRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ form: RelatedFormModel }))
    .mutation(async ({ ctx, input: { form } }) => {
      return ctx.db.form.create({
        data: {
          id: form.id,
          createdById: form.createdById,
          fields: {
            createMany: {
              data: form.fields
            }
          }
        }
      });
    }),
});
