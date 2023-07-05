import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});




export const postRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),

  create: protectedProcedure
  .input(z.object({ title: z.string(), content: z.string() }))
  .mutation(async ({ input: { title, content }, ctx }) => {
    const post = await ctx.prisma.post.create({
      data: { 
        title, 
        content, 
        userId: ctx.session.user.id },
    });

    return post;
  }),
});
