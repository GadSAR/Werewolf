import { getServerAuthSession } from "~/server/auth";

export default async function Join() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-white">
      <button>join</button>
    </main>
  );
}
