import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

type NavBarProps = {
  session: Session | null;
};

const NavBar = ({ session }: NavBarProps) => {
  return (
    <nav className="flex items-center justify-between bg-black px-6 py-4 text-white">
      <Link className="text-2xl font-semibold" href="/">
        Werewolf Game
      </Link>
      <section className="flex flex-row items-center gap-3 ">
        {session && (
          <>
            <p className="text-xs">{session.user.name}</p>
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="profile photo"
                width={30}
                height={30}
                className="rounded-full"
              />
            )}
          </>
        )}
      </section>
    </nav>
  );
};

export default NavBar;
