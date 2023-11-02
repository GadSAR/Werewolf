import { z } from "zod";
import { pusherServer } from "~/lib/pusher";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const data = ctx.db.room.create({
      data: {
        createdBy: { connect: { id: ctx.session.user.id } },
      },
    });
    await pusherServer.trigger("room", "create", data);
    return data;
  }),

  getRoom: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.room.findFirst({
        orderBy: { createdAt: "desc" },
        where: { createdBy: { id: ctx.session.user.id }, id: input.id },
      });
    }),

  updateRoom: protectedProcedure
    .input(z.object({ id: z.string(), phase: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.room.update({
        where: { id: input.id },
        data: { updatedAt: new Date(), phase: input.phase },
      });
      await pusherServer.trigger(`room-${input.id}`, "game", data);
      return data;
    }),
});
