export default function Poker() {
  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-r from-indigo-500 via-cyan-300 to-indigo-500">
      <div className="container mx-auto min-h-screen px-4">
        <section className="flex w-full flex-wrap justify-center gap-4 py-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
        <Options />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="flex h-52 w-40 items-center justify-center rounded-lg bg-gradient-to-r from-green-400 via-green-300 to-green-400 px-2 transition-colors hover:cursor-pointer hover:from-green-700 hover:via-green-600 hover:to-green-700">
      <p className="font-mono text-[6.5rem] leading-[6rem] text-white">42</p>
    </div>
  );
}

function Options() {
  const buttonClasses =
    "rounded bg-green-400 px-4 py-2 text-white transition-colors hover:bg-green-600";
  return (
    <section className="flex justify-evenly gap-4 py-4">
      <button className={buttonClasses}>Remover jogadores</button>
      <button className={buttonClasses}>Configurar cartas</button>
      <button className={buttonClasses}>Limpar cartas</button>
      <button className={buttonClasses}>Virar cartas</button>
    </section>
  );
}
