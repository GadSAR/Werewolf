import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

type NavBarProps = {
  session: Session | null;
};

const NavBar = ({ session }: NavBarProps) => {
  return (
    <nav className="flex items-center justify-between bg-black px-4 py-2 text-white">
      <Link className="text-2xl font-semibold" href="/">
        Werewolf Game
      </Link>
      <p className="flex flex-row items-center gap-2 ">
        {session && (
          <>
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="profile photo"
                width={30}
                height={30}
                className="rounded-full"
              />
            )}
            <span>{session.user.name}</span>
          </>
        )}
      </p>
    </nav>
  );
};

export default NavBar;
