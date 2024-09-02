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
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="flex h-52 w-40 items-center justify-center rounded-lg bg-green-400 px-2 transition-colors hover:cursor-pointer hover:bg-green-800">
      <p className="font-mono text-[6.5rem] leading-[6rem]">42</p>
    </div>
  );
}
