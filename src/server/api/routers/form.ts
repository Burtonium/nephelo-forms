import { FieldModelInsert, FormInsertModel, RelatedFormModel } from "prisma/zod";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const formRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ form: FormInsertModel, fields: z.array(FieldModelInsert) }))
    .mutation(async ({ ctx, input: { form, fields } }) => {
      return ctx.db.form.create({
        data: {
          id: form.id,
          createdById: form.createdById,
          fields: {
            createMany: {
              data: fields
            }
          }
        }
      });
    }),
  fetch: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const form = await ctx.db.form.findFirst({
        include: {
          fields: {
            include: {
              children: true
            }
          },
          createdBy: true,
        },
        where: {
          id: input.id
        },
      });

      return form ? RelatedFormModel.parse(form) : form;
    }),
  fetchAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.form.findMany({
      include: {
        fields: true 
      },
      take: 10,
      orderBy: { createdAt: "desc" },
    });
  })
});
