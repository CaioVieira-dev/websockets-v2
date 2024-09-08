"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "./button";
import { Card } from "./card";

type NewCardsDialogProps = {
  changeCards: (newSymbols: string[]) => void;
};

export function NewCardsDialog({ changeCards }: NewCardsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState<string[]>([]);
  const [newCard, setNewCard] = useState<string>("");

  const toggleModal = useCallback(() => {
    if (!isOpen) {
      dialogRef?.current?.showModal();
    } else {
      dialogRef?.current?.close();
    }

    setIsOpen((prev) => !prev);
  }, [isOpen]);

  const onClickDialog = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      e.preventDefault();
      //ao clicar no backdrop
      if (e.target === dialogRef?.current) {
        toggleModal();
        setNewCard("");
        setCards([]);
      }
    },
    [toggleModal],
  );

  return (
    <div className="relative">
      <Button onClick={toggleModal}>Configurar cartas</Button>
      <dialog
        className="absolute left-1/2 top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 transform rounded-xl p-0 backdrop:bg-slate-950 backdrop:opacity-75"
        ref={dialogRef}
        onClick={onClickDialog}
      >
        <form
          method="dialog"
          className="container flex w-full min-w-[50vw] flex-col gap-4 p-4"
        >
          <div className="flex w-full flex-grow flex-col gap-2">
            <label htmlFor="newCard">Carta:</label>
            <div className="flex">
              <input
                type="text"
                name="newCard"
                value={newCard}
                list="emojis"
                onChange={(e) => setNewCard(e.target.value)}
                placeholder="Digite o valor da nova carta..."
                className="w-full rounded-s border border-green-600 px-2"
                maxLength={2}
              />
              <datalist id="emojis">
                <option value="&#x2615;">:coffe:</option>
                <option value="&#x1F921;">:clown:</option>
                <option value="&#x1F600;">:grinning:</option>
                <option value="&#x1F4A9;">:poop:</option>
                <option value="&#x1F923;">:roll:</option>
              </datalist>
              <button
                type="button"
                onClick={() => {
                  setCards((v) => [...v, newCard]);
                  setNewCard("");
                }}
                className="w-fit text-nowrap rounded-e border-b border-e border-t border-green-600 bg-green-200 px-4 py-2"
              >
                Adicionar carta
              </button>
            </div>
          </div>
          <p>Novas cartas:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {cards.map((symbol, i) => (
              <Card symbol={symbol} key={`nova-carta-${i}`} mini />
            ))}
          </div>
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              changeCards(cards);
              setNewCard("");
              setCards([]);
              toggleModal();
            }}
          >
            Salvar
          </Button>
        </form>
      </dialog>
    </div>
  );
}
