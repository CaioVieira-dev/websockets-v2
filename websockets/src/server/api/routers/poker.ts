import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

let cardIsShown = true;
let possibleCards = ["1", "2", "3", "5", "8", "13", "21"];

export const pokerRouter = createTRPCRouter({
  toggleCardIsShown: publicProcedure.mutation(async () => {
    cardIsShown = !cardIsShown;
    return cardIsShown;
  }),

  getCardIsShown: publicProcedure.query(() => {
    return cardIsShown;
  }),

  setPossibleCards: publicProcedure
    .input(z.object({ newPossibleCards: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      possibleCards = input.newPossibleCards;
      return possibleCards;
    }),

  getPossibleCards: publicProcedure.query(() => {
    return possibleCards;
  }),
});
