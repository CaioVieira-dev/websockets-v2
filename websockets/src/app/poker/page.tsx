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

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-r from-indigo-500 via-cyan-300 to-indigo-500">
      <div className="container mx-auto flex min-h-screen flex-col px-4 py-2">
        <section className="flex w-full flex-wrap justify-center gap-4 py-4">
          <Card symbol="1" onClick={setPlayerCard(1)} />
          <Card symbol="2" onClick={setPlayerCard(1)} />
          <Card symbol="3" onClick={setPlayerCard(1)} />
          <Card symbol="5" onClick={setPlayerCard(1)} />
          <Card symbol="8" onClick={setPlayerCard(1)} />
          <Card symbol="13" onClick={setPlayerCard(1)} />
          <Card symbol="21" onClick={setPlayerCard(1)} />
        </section>
        <Options clearBoard={clearBoard} removePlayers={removePlayers} />
        <Board players={players} />
      </div>
    </div>
  );
}
