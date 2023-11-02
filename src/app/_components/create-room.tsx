"use client";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

export function CreateRoom() {
  const router = useRouter();

  const createRoom = api.room.create.useMutation({
    onSuccess: (res) => {
      router.push(`/room/${res.id}`);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createRoom.mutate();
      }}
      className="flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-xl bg-gray-900 px-4 py-6"
    >
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createRoom.isLoading}
      >
        {createRoom.isLoading ? "Creating..." : "Create Room"}
      </button>
    </form>
  );
}
