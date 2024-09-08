import { Card } from "./card";

export function Board() {
  return (
    <section className="flex w-full grow flex-col gap-2 rounded-3xl bg-gradient-to-r from-green-200 via-green-100 to-green-200 px-4 py-2">
      <Line className="flex items-center justify-between border-b-2 border-green-300 px-4 py-2">
        <h5 className="text-4xl">Jogador</h5>
        <h5 className="text-4xl">Pontuação:</h5>
      </Line>
      <Player name="Caio" />
      <Player name="Testerson" />
    </section>
  );
}

type lineProps = {
  children: string | React.JSX.Element | React.JSX.Element[];
  className?: string;
};

function Line({ children, className }: lineProps) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 ${className ? className : ""}`}
    >
      {children}
    </div>
  );
}

type PlayerProps = {
  name: string;
};

function Player({ name }: PlayerProps) {
  return (
    <Line>
      <p className="text-4xl">{name}</p>
      <Card mini />
    </Line>
  );
}
