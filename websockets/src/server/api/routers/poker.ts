import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

let cardIsShown = true;
let possibleCards = ["1", "2", "3", "5", "8", "13", "21"];

const playerZodSchema = z.object({
  name: z.string(),
  card: z.string().optional(),
  id: z.number(),
});
let players: z.infer<typeof playerZodSchema>[] = [
  {
    name: "Caio",
    card: "21",
    id: 1,
  },
  {
    name: "Testerson",
    card: "13",
    id: 2,
  },
];

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

  setPlayers: publicProcedure
    .input(
      z.object({
        newPlayers: z.array(playerZodSchema),
      }),
    )
    .mutation(async ({ input }) => {
      players = input.newPlayers;
      return players;
    }),

  getPlayers: publicProcedure.query(() => {
    return players;
  }),
});
