import "~/styles/globals.css";

import { Oswald, Montserrat } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import classNames from "classnames";
import Navbar from "./components/Navbar";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
import { CookiesProvider } from 'next-client-cookies/server';
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-title",
  display: 'swap',
  weight: '600'
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap'
});

export const metadata = {
  title: "Nephelo Forms",
  description: "Custom forms and data management made easy.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get('theme')?.value;
  const session = await getServerAuthSession();
  const user = session && await db.user.findFirst({ where: { id: session?.user.id } })

  return (
    <html className={classNames({ dark: theme === 'dark' })} lang="en">
      <body className={`font-sans ${montserrat.variable} ${oswald.variable} dark:bg-zinc-900 bg-zinc-100`}>
        <CookiesProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <Navbar user={user} />
            {children}
          </TRPCReactProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
