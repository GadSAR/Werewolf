import Image from "next/image";
import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-6 ">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            {session && (
              <>
                <p className="text-center text-2xl text-white">
                  <span>Logged in as {session.user?.name}</span>
                </p>
                <Image
                  src={session?.user?.image ?? ""}
                  alt="user profile photo"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </>
            )}
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
      {/* <Link
        href="/posts"
        className="rounded-full bg-white/10 px-20 py-6 font-semibold no-underline transition hover:bg-white/20"
      >
        View Posts
      </Link> */}
      <Link
        href="/new"
        className="my-2 rounded-full bg-white/10 px-20 py-6 font-semibold no-underline transition hover:bg-white/20"
      >
        Start Now!
      </Link>
    </main>
  );
}
