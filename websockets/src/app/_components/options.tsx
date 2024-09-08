import { Button } from "./button";

export function Options() {
  return (
    <section className="flex justify-evenly gap-4 py-4">
      <Button>Remover jogadores</Button>
      <Button>Configurar cartas</Button>
      <Button>Limpar cartas</Button>
      <Button>Virar cartas</Button>
    </section>
  );
}
