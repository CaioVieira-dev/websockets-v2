import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

let cardIsShown = true;

export const pokerRouter = createTRPCRouter({
  toggleCardIsShown: publicProcedure.mutation(async () => {
    cardIsShown = !cardIsShown;
    return cardIsShown;
  }),

  getCardIsShown: publicProcedure.query(() => {
    return cardIsShown;
  }),
});
