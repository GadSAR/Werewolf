import { getServerAuthSession } from "~/server/auth";
import { CreateRoom } from "../_components/create-room";
import { JoinRoom } from "../_components/join-room";

export default async function Lobby() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  return (
    <>
      <JoinRoom />
      <CreateRoom />
    </>
  );
}
