import { Button } from "./button";

type OptionsProps = {
  removePlayers: () => void;
};

export function Options({ removePlayers }: OptionsProps) {
  return (
    <section className="flex justify-evenly gap-4 py-4">
      <Button onClick={removePlayers}>Remover jogadores</Button>
      <Button>Configurar cartas</Button>
      <Button>Limpar cartas</Button>
      <Button>Virar cartas</Button>
    </section>
  );
}
