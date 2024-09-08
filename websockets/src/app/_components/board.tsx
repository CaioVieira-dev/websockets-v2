import { Card } from "./card";

export function Board() {
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
