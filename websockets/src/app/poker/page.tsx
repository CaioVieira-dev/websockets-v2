"use client";

import React, { useCallback, useState } from "react";
import { Options } from "../_components/options";
import { Card } from "../_components/card";
import { Board } from "../_components/board";

type playerType = {
  name: string;
  card?: string;
  id: number;
};

export default function Poker() {
  const [players, setPlayers] = useState<playerType[]>([
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
  ]);
  const [cardIsShown, setCardIsShown] = useState(true);
  const [possibleCards, setPossibleCards] = useState([
    "1",
    "2",
    "3",
    "5",
    "8",
    "13",
    "21",
  ]);

  const setPlayerCard = useCallback(
    (id: number) => (newCard: string) =>
      setPlayers((prev) =>
        prev.map((player) => {
          if (player.id === id) {
            return { ...player, card: newCard };
          }

          return player;
        }),
      ),
    [],
  );

  const removePlayers = useCallback(() => setPlayers([]), []);
  const clearBoard = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    () => setPlayers((prev) => prev.map(({ card, ...player }) => player)),
    [],
  );
  const toggleCardIsShown = useCallback(
    () => setCardIsShown((prev) => !prev),
    [],
  );
  const changeCards = useCallback(
    (newSymbols: string[]) => setPossibleCards(newSymbols),
    [],
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
