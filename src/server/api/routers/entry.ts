import { FieldEntryUnionModel } from "prisma/zod/fieldEntry";
import { FormEntryInsert, RelatedFormEntryModel } from "prisma/zod/formEntry";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const entryRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ entry: FormEntryInsert, entries: z.array(FieldEntryUnionModel) }))
    .mutation(async ({ ctx, input: { entry, entries } }) => {
      return ctx.db.formEntry.create({
        data: {
          ...entry,
          fieldEntries: {
            createMany: {
              data: entries
            }
          }
        }
      });
    }),
  fetch: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.formEntry.findFirst({
        include: {
          fieldEntries: true,
          form: {
            include: {
              fields: {
                include: {
                  children: true,
                }
              },
            }
          },
          user: true,
        },
        where: {
          id: input.id
        },
      });

      return result && RelatedFormEntryModel.parse(result);
    }),
  fetchAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.formEntry.findMany({
      include: {
        fieldEntries: true 
      },
      take: 10,
      orderBy: { createdAt: "desc" },
    });
  })
});
