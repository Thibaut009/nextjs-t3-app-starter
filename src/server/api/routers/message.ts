import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
    getAllMessagesBetweenUsers: protectedProcedure
    .input(
        z.object({
            senderId: z.string(),
            receiverId: z.string(),
            content: z.string(),
        })
    )
    .mutation(async ({ input: { senderId, receiverId, content }, ctx }) => {
        if (!ctx.session.user) {
          throw new Error("Utilisateur non authentifié");
        }
    
        try {
            const newMessage = ctx.prisma.message.create({
                data: {
                    sender: { connect: { id: senderId } },
                    receiver: { connect: { id: receiverId } },
                    content: content,
                },
            });
            return newMessage;

        } catch (error) {
            console.error('Error adding new message:', error);
            throw new Error("Une erreur est survenue lors de l'ajout du message");
        }
    })
});
