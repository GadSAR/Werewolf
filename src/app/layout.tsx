import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import NavBar from "./_components/nav-bar";
import { getServerAuthSession } from "~/server/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Werewolf Game",
  description: "A multiplayer game of Werewolf",
  icons: [{ rel: "icon", url: "/werewolf.svg" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} overflow-hidden`}
        suppressHydrationWarning
      >
        <TRPCReactProvider headers={headers()}>
          <NavBar session={session} />
          <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-white">
            {children}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
