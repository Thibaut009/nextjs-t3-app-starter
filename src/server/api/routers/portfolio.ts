import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

const isUrlValid = (inputUrl: string) => {
  const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
  return urlPattern.test(inputUrl);
};

export const portfolioRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const portfolios = await ctx.prisma.portfolio.findMany({
      include: { user: true },
    });

    return portfolios;
  }),

  getUserPortfolio: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user) {
      throw new Error("Utilisateur non authentifié");
    }

    const portfolio = await ctx.prisma.portfolio.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return portfolio;
  }),

  add: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        url: z.string().refine((value) => isUrlValid(value), {
          message: "URL is not valid",
        }),
      })
    )
    .mutation(async ({ input: { title, url }, ctx }) => {
      if (!ctx.session.user) {
        throw new Error("Utilisateur non authentifié");
      }

      const existingPortfolio = await ctx.prisma.portfolio.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (existingPortfolio) {
        const updatedPortfolio = await ctx.prisma.portfolio.update({
          where: {
            id: existingPortfolio.id,
          },
          data: {
            title,
            url,
          },
        });

        return updatedPortfolio;
      } else {
        const createdPortfolio = await ctx.prisma.portfolio.create({
          data: {
            title,
            url,
            userId: ctx.session.user.id,
          },
        });

        return createdPortfolio;
      }
    }),
});
