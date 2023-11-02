"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function JoinRoom() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const joinRoom = () => {
    router.push(`/room/${code}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        joinRoom();
      }}
      className="flex w-full max-w-md flex-col items-center justify-center gap-5 rounded-xl bg-gray-900 px-4 py-10"
    >
      <input
        className="w-96 rounded-full border-2 border-white/10 px-4 py-2 text-center text-black"
        onChange={(e) => setCode(e.target.value)}
        value={code}
        maxLength={25}
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={code.length < 25}
      >
        {false ? "Joining..." : "Join Room"}
      </button>
    </form>
  );
}
