type CardProps = {
  mini?: boolean;
  symbol: string;
  onClick?: (symbol: string) => void;
  cardIsShown?: boolean;
};

export function Card({ mini, symbol, onClick, cardIsShown = true }: CardProps) {
  return (
    <div
      className={`flex ${mini ? "h-[5rem] w-16" : "h-52 w-40"} items-center justify-center rounded-lg bg-gradient-to-r from-green-400 via-green-300 to-green-400 px-2 transition-colors hover:cursor-pointer hover:from-green-700 hover:via-green-600 hover:to-green-700`}
      onClick={() => onClick?.(symbol)}
    >
      <p
        className={`font-mono ${mini ? "text-[2.5rem] leading-[1.75rem]" : "text-[6.5rem] leading-[6rem]"} text-white`}
      >
        {cardIsShown ? symbol : ""}
      </p>
    </div>
  );
}
