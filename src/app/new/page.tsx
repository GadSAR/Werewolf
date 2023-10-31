import { getServerAuthSession } from "~/server/auth";
import { CreateRoom } from "../_components/create-room";

export default async function New() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-white">
      <CreateRoom />
    </main>
  );
}
