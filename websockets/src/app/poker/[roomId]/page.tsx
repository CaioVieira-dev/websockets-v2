"use client";

import dynamic from "next/dynamic";
import { Options } from "../../_components/options";
import { Card } from "../../_components/card";
const Board = dynamic(() => import("../../_components/board"), { ssr: false });
import { useCallback } from "react";
import { api as clientApi } from "~/trpc/react";

export default function Poker({ params }: { params: { roomId: string } }) {
  const { roomId } = params;

  const [cardIsShown] = clientApi.poker.getCardIsShown.useSuspenseQuery({
    roomId,
  });
  const [possibleCards] = clientApi.poker.getPossibleCards.useSuspenseQuery({
    roomId,
  });
  const [players] = clientApi.poker.getPlayers.useSuspenseQuery({ roomId });

  const utils = clientApi.useUtils();
  const toggleOnServer = clientApi.poker.toggleCardIsShown.useMutation({
    onSuccess: async () => {
      await utils.poker.getCardIsShown.invalidate({ roomId });
    },
  });
  const changeCardsOnServer = clientApi.poker.setPossibleCards.useMutation({
    onSuccess: async () => {
      await utils.poker.getPossibleCards.invalidate({ roomId });
    },
  });

  const setPlayersOnServer = clientApi.poker.setPlayers.useMutation({
    onSuccess: async () => {
      await utils.poker.getPlayers.invalidate({ roomId });
    },
  });

  const toggleCardIsShown = useCallback(async () => {
    toggleOnServer.mutate({ roomId });
  }, [roomId, toggleOnServer]);

  const setPlayerCard = useCallback(
    (id: number) => (newCard: string) =>
      setPlayersOnServer.mutate({
        newPlayers: players.map((player) => {
          if (player.id === id) {
            return { ...player, card: newCard };
          }

          return player;
        }),
        roomId,
      }),
    [players, roomId, setPlayersOnServer],
  );

  const removePlayers = useCallback(
    () =>
      setPlayersOnServer.mutate({
        newPlayers: [],
        roomId,
      }),
    [roomId, setPlayersOnServer],
  );

  const clearBoard = useCallback(
    () =>
      setPlayersOnServer.mutate({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        newPlayers: players.map(({ card, ...player }) => player),
        roomId,
      }),
    [players, roomId, setPlayersOnServer],
  );

  const changeCards = useCallback(
    (newSymbols: string[]) =>
      changeCardsOnServer.mutate({ newPossibleCards: newSymbols, roomId }),
    [changeCardsOnServer, roomId],
  );

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-r from-indigo-500 via-cyan-300 to-indigo-500">
      <div className="container mx-auto flex min-h-screen flex-col px-4 py-2">
        <section className="flex w-full flex-wrap justify-center gap-4 py-4">
          {possibleCards.map((symbol, i) => (
            <Card
              symbol={symbol}
              onClick={setPlayerCard(1)}
              key={`card-${i}`}
            />
          ))}
        </section>
        <Options
          clearBoard={clearBoard}
          removePlayers={removePlayers}
          cardIsShown={cardIsShown}
          toggleCardIsShown={toggleCardIsShown}
          changeCards={changeCards}
        />
        <Board players={players} cardIsShown={cardIsShown} />
      </div>
    </div>
  );
}
