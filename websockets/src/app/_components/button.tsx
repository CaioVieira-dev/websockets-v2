type ButtonProps = {
  children: string | React.JSX.Element | React.JSX.Element[];
} & React.HTMLProps<HTMLButtonElement>;

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="rounded bg-green-400 px-4 py-2 text-white transition-colors hover:bg-green-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
