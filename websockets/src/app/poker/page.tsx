import React from "react";
import { Button } from "../_components/button";

export default function Poker() {
  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-r from-indigo-500 via-cyan-300 to-indigo-500">
      <div className="container mx-auto min-h-screen px-4">
        <section className="flex w-full flex-wrap justify-center gap-4 py-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
        <Options />
        <Board />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="flex h-52 w-40 items-center justify-center rounded-lg bg-gradient-to-r from-green-400 via-green-300 to-green-400 px-2 transition-colors hover:cursor-pointer hover:from-green-700 hover:via-green-600 hover:to-green-700">
      <p className="font-mono text-[6.5rem] leading-[6rem] text-white">42</p>
    </div>
  );
}

function Options() {
  return (
    <section className="flex justify-evenly gap-4 py-4">
      <Button>Remover jogadores</Button>
      <Button>Configurar cartas</Button>
      <Button>Limpar cartas</Button>
      <Button>Virar cartas</Button>
    </section>
  );
}

function Board() {
  return (
    <section className="flex w-full flex-col gap-2 rounded-3xl bg-gradient-to-r from-green-200 via-green-100 to-green-200 px-4 py-2">
      <div className="flex items-center justify-between border-b-2 border-green-300 px-4 py-2">
        <h5 className="text-4xl">Jogador</h5>
        <h5 className="text-4xl">Pontuação:</h5>
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        <p className="text-4xl">Caio</p>
        <Card />
      </div>
    </section>
  );
}
