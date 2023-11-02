import { notFound } from "next/navigation";
import PhaseManager from "~/app/_components/phase-manager";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { roomId: string } }) {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const { roomId } = params;
  const room = await api.room.getRoom.query({ id: roomId });

  if (room) {
    return (
      <>
        <p>{`room ${room.id}`}</p>
        <PhaseManager room={room} />
      </>
    );
  } else {
    notFound();
  }
}
