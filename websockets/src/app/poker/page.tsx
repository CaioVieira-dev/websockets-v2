import React from "react";
import { Options } from "../_components/options";
import { Card } from "../_components/card";
import { Board } from "../_components/board";

export default function Poker() {
  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-r from-indigo-500 via-cyan-300 to-indigo-500">
      <div className="container mx-auto flex min-h-screen flex-col px-4 py-2">
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
