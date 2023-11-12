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
    .query(async ({ ctx, input }) => {
      const data = ctx.db.room.findFirst({
        orderBy: { createdAt: "desc" },
        where: { createdBy: { id: ctx.session.user.id }, id: input.id },
        include: { players: true },
      });
      return data;
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

  joinRoom: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.room.update({
        where: { id: input.id },
        data: {
          updatedAt: new Date(),
          players: { connect: { id: ctx.session.user.id } },
        },
      });
      await pusherServer.trigger(`room-${input.id}`, "user-joined", data);
      return data;
    }),

  leaveRoom: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.room.update({
        where: { id: input.id },
        data: {
          updatedAt: new Date(),
          players: { disconnect: { id: ctx.session.user.id } },
        },
      });
      await pusherServer.trigger(`room-${input.id}`, "user-left", data);
      return data;
    }),

  getPlayers: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = ctx.db.room.findFirst({
        where: { id: input.id },
        select: { players: true },
      });
      return data;
    }),
});
