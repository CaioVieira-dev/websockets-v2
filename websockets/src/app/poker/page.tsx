"use client";

import { Options } from "../_components/options";
import { Card } from "../_components/card";
import { Board } from "../_components/board";
import { useCallback } from "react";
import { api as clientApi } from "~/trpc/react";

export default function Poker() {
  const [cardIsShown] = clientApi.poker.getCardIsShown.useSuspenseQuery();
  const [possibleCards] = clientApi.poker.getPossibleCards.useSuspenseQuery();
  const [players] = clientApi.poker.getPlayers.useSuspenseQuery();

  const utils = clientApi.useUtils();
  const toggleOnServer = clientApi.poker.toggleCardIsShown.useMutation({
    onSuccess: async () => {
      await utils.poker.getCardIsShown.invalidate();
    },
  });
  const changeCardsOnServer = clientApi.poker.setPossibleCards.useMutation({
    onSuccess: async () => {
      await utils.poker.getPossibleCards.invalidate();
    },
  });

  const setPlayersOnServer = clientApi.poker.setPlayers.useMutation({
    onSuccess: async () => {
      await utils.poker.getPlayers.invalidate();
    },
  });

  const toggleCardIsShown = useCallback(async () => {
    toggleOnServer.mutate();
  }, [toggleOnServer]);

  const setPlayerCard = useCallback(
    (id: number) => (newCard: string) =>
      setPlayersOnServer.mutate({
        newPlayers: players.map((player) => {
          if (player.id === id) {
            return { ...player, card: newCard };
          }

          return player;
        }),
      }),
    [players, setPlayersOnServer],
  );

  const removePlayers = useCallback(
    () =>
      setPlayersOnServer.mutate({
        newPlayers: [],
      }),
    [setPlayersOnServer],
  );

  const clearBoard = useCallback(
    () =>
      setPlayersOnServer.mutate({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        newPlayers: players.map(({ card, ...player }) => player),
      }),
    [players, setPlayersOnServer],
  );

  const changeCards = useCallback(
    (newSymbols: string[]) =>
      changeCardsOnServer.mutate({ newPossibleCards: newSymbols }),
    [changeCardsOnServer],
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
