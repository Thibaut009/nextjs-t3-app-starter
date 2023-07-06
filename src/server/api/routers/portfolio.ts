import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const portfolioRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const portfolios = await ctx.prisma.portfolio.findMany({
      include: { user: true }, // Inclure les données de l'utilisateur lié au portfolio
    });

    return portfolios;
  }),

  getUserPortfolio: protectedProcedure.query(async ({ ctx }) => {
    // Vérifier d'abord si l'utilisateur est authentifié
    if (!ctx.session.user) {
      throw new Error("Utilisateur non authentifié");
    }

    // Récupérer le portfolio de l'utilisateur
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
      url: z.string(),
    })
  )
  .mutation(async ({ input: { title, url }, ctx }) => {
    // Vérifier d'abord si l'utilisateur est authentifié
    if (!ctx.session.user) {
      throw new Error("Utilisateur non authentifié");
    }

    // Vérifier si l'utilisateur a déjà un portfolio
    const existingPortfolio = await ctx.prisma.portfolio.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });

    if (existingPortfolio) {
      // Si un portfolio existe, effectuer la mise à jour
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
      // Si aucun portfolio n'existe, effectuer la création
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
