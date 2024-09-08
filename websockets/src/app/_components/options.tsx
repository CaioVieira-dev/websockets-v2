import { Button } from "./button";

type OptionsProps = {
  clearBoard: () => void;
  removePlayers: () => void;
};

export function Options({ removePlayers, clearBoard }: OptionsProps) {
  return (
    <section className="flex justify-evenly gap-4 py-4">
      <Button onClick={removePlayers}>Remover jogadores</Button>
      <Button>Configurar cartas</Button>
      <Button onClick={clearBoard}>Limpar cartas</Button>
      <Button>Virar cartas</Button>
    </section>
  );
}
