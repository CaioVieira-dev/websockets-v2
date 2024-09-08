import { Button } from "./button";

type OptionsProps = {
  clearBoard: () => void;
  removePlayers: () => void;
  cardIsShown: boolean;
  toggleCardIsShown: () => void;
};

export function Options({
  removePlayers,
  clearBoard,
  cardIsShown,
  toggleCardIsShown,
}: OptionsProps) {
  return (
    <section className="flex justify-evenly gap-4 py-4">
      <Button onClick={removePlayers}>Remover jogadores</Button>
      <Button>Configurar cartas</Button>
      <Button onClick={clearBoard}>Limpar cartas</Button>
      <Button onClick={toggleCardIsShown}>
        {cardIsShown ? "Esconder cartas" : "Virar cartas"}
      </Button>
    </section>
  );
}
