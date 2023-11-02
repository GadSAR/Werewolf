import { create } from "zustand";
import type { Room, User } from "~/types/trpc";

interface GameStore {
  roomGame: Room | null;
  setRoomGame: (room: Room) => void;
  phase: number;
  toPhase: (to: number) => void;
  users: User[];
  setUsers: (users: User[]) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  roomGame: null,
  setRoomGame: (room: Room) => {
    set(() => {
      return {
        roomGame: room,
        phase: room ? room.phase : 0,
      };
    });
  },
  phase: 0,
  toPhase: (to: number) => {
    set(() => {
      return { phase: to };
    });
  },
  users: [],
  setUsers: (users: User[]) => {
    set(() => {
      return { users: users };
    });
  },
}));
