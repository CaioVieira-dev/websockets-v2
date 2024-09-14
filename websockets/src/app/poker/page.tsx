"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { api as clientApi } from "~/trpc/react";

export default function EnterPokerRoom() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [roomPath, setRoomPath] = useState("");

  const enterOrCreateRoomOnServer = clientApi.poker.getOrCreateRoom.useMutation(
    {
      onSuccess: (room) => {
        console.log("r: ", room);
        setRoomPath(`/poker/${room}`);
      },
    },
  );

  useEffect(() => {
    if (roomPath) {
      console.log(roomPath);
      router.push(roomPath);
    }
  }, [roomPath, router]);

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-r from-indigo-500 via-cyan-300 to-indigo-500">
      <div className="container mx-auto flex min-h-screen flex-col px-4 py-2">
        <form
          method="post"
          className="container flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-green-200 via-green-100 to-green-200 p-4 text-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            enterOrCreateRoomOnServer.mutate({
              name: name ?? "Zé ninguem",
              room,
            });
          }}
        >
          <h1 className="self-center py-2 text-6xl">{"Poker :)"}</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="w-full">
              Nome:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Seu nome..."
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="room">Sala:</label>
            <input
              type="text"
              name="room"
              placeholder="Entre numa sala em andamento..."
              onChange={(e) => setRoom(e.target.value)}
              value={room}
              className="rounded px-2 py-1"
            />
          </div>
          <button className="w-full self-center rounded bg-green-300 px-4 py-2 md:max-w-[50%]">
            {room ? "Entrar na sala!" : "Criar uma sala"}
          </button>
        </form>
      </div>
    </div>
  );
}
