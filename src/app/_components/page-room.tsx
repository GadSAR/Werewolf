"use client";
import { notFound } from "next/navigation";
import { useGameStore } from "~/store/game";
import type { Room } from "~/types/trpc";

type PageRoomProps = {
  room: Room;
};

const PageRoom = ({ room }: PageRoomProps) => {
  const { roomGame, setRoomGame } = useGameStore();
  setRoomGame(room);
  if (roomGame) {
    return <div>PageRoom</div>;
  } else {
    notFound();
  }
};

export default PageRoom;
