"use client";
import { useGameStore } from "~/store/game";
import LobbyGame from "./lobby-game";
import LobbySettings from "./lobby-settings";
import WaitingLobby from "./waiting-lobby";
import { useEffect } from "react";
import { pusherClient } from "~/lib/pusher";
import { api } from "~/trpc/react";
import type { Room, User } from "@prisma/client";

type PhaseManagerProps = {
  room: Room;
};

const PhaseManager = ({ room }: PhaseManagerProps) => {
  const { roomGame, setRoomGame, setUsers, phase, toPhase } = useGameStore();
  const roomId = room.id;

  useEffect(() => {
    const channel = pusherClient.subscribe(`room-${roomId}`);
    channel.bind("game", function (data: Room) {
      if (data) setRoomGame(data);
    });
    channel.bind("users", function (data: User[]) {
      if (data) setUsers(data);
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(`room-${roomId}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const updateRoom = api.room.updateRoom.useMutation({
    onError: (err) => {
      console.log(err);
    },
  });

  const moveToNextPhase = () => {
    updateRoom.mutate({ id: roomId, phase: phase + 1 });
  };
  const moveToPreviousPhase = () => {
    updateRoom.mutate({ id: roomId, phase: phase - 1 });
  };

  return (
    <>
      {phase === 0 && (
        <WaitingLobby
          previousPhase={moveToPreviousPhase}
          nextPhase={moveToNextPhase}
        />
      )}
      {phase === 1 && (
        <LobbySettings
          previousPhase={moveToPreviousPhase}
          nextPhase={moveToNextPhase}
        />
      )}
      {phase === 2 && (
        <LobbyGame
          previousPhase={moveToPreviousPhase}
          nextPhase={moveToNextPhase}
        />
      )}
    </>
  );
};

export default PhaseManager;
