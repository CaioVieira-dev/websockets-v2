import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const cardIsShown = true;
const possibleCards = ["1", "2", "3", "5", "8", "13", "21"];

const playerZodSchema = z.object({
  name: z.string(),
  card: z.string().optional(),
  id: z.number(),
});
const players: z.infer<typeof playerZodSchema>[] = [
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

type roomType = Record<
  string,
  {
    players: z.infer<typeof playerZodSchema>[];
    possibleCards: string[];
    cardIsShown: boolean;
  }
>;

const rooms: roomType = {
  "1": {
    players,
    possibleCards,
    cardIsShown,
  },
  "2": {
    players: [
      ...players,
      {
        name: "zé",
        card: "3",
        id: 3,
      },
    ],
    possibleCards: [...possibleCards],
    cardIsShown,
  },
};

export const pokerRouter = createTRPCRouter({
  toggleCardIsShown: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .mutation(async ({ input }) => {
      const room = rooms[input.roomId];

      if (!room) {
        console.log("faltou passar a sala parça");
        return false;
      }

      room.cardIsShown = !room.cardIsShown;
      return room.cardIsShown;
    }),

  getCardIsShown: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .query(({ input }) => {
      return rooms?.[input.roomId]?.cardIsShown ?? false;
    }),

  setPossibleCards: publicProcedure
    .input(
      z.object({ newPossibleCards: z.array(z.string()), roomId: z.string() }),
    )
    .mutation(async ({ input }) => {
      const room = rooms[input.roomId];

      if (!room) {
        console.log("faltou passar a sala parça");
        return [];
      }

      room.possibleCards = input.newPossibleCards;
      return room.possibleCards;
    }),

  getPossibleCards: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .query(({ input }) => {
      const room = rooms[input.roomId];

      if (!room) {
        console.log("faltou passar a sala parça");
        return [];
      }

      return room.possibleCards;
    }),

  setPlayers: publicProcedure
    .input(
      z.object({
        newPlayers: z.array(playerZodSchema),
        roomId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const room = rooms[input.roomId];

      if (!room) {
        console.log("faltou passar a sala parça");
        return [];
      }

      room.players = input.newPlayers;
      return room.players;
    }),

  getPlayers: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .query(({ input }) => {
      const room = rooms[input.roomId];

      if (!room) {
        console.log("faltou passar a sala parça");
        return [];
      }

      return room.players;
    }),

  //TODO: rever esse nome de função
  getOrCreateRoom: publicProcedure
    .input(z.object({ room: z.string().optional(), name: z.string().min(1) }))
    .mutation(({ input }) => {
      const roomId =
        (input?.room === ""
          ? String(Object.keys(rooms).length + 1)
          : input.room) ?? "1";

      const room = rooms[roomId];

      if (!room) {
        rooms[roomId] = {
          players: [
            {
              name: input.name,
              id: 1,
            },
          ],
          possibleCards: [...possibleCards],
          cardIsShown,
        };

        return roomId;
      }

      if (!room.players.some(({ name }) => name === input.name)) {
        room.players.push({
          id: room.players.length + 1,
          name: input.name,
        });
      }

      return roomId;
    }),
});
