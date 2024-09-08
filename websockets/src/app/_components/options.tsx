import { Button } from "./button";
import { NewCardsDialog } from "./newCardsDialog";

type OptionsProps = {
  clearBoard: () => void;
  removePlayers: () => void;
  cardIsShown: boolean;
  toggleCardIsShown: () => void;
  changeCards: (newSymbols: string[]) => void;
};

export function Options({
  removePlayers,
  clearBoard,
  cardIsShown,
  toggleCardIsShown,
  changeCards,
}: OptionsProps) {
  return (
    <section className="flex justify-evenly gap-4 py-4">
      <Button onClick={removePlayers}>Remover jogadores</Button>
      <NewCardsDialog changeCards={changeCards} />
      <Button onClick={clearBoard}>Limpar cartas</Button>
      <Button onClick={toggleCardIsShown}>
        {cardIsShown ? "Esconder cartas" : "Virar cartas"}
      </Button>
    </section>
  );
}
