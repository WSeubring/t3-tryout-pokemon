import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import Head from "next/head";
import Link from "next/link";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Playground</title>
        <meta
          name="description"
          content="This web application is used to explore different tool, libraries and ideas. The initial template is setup using the T3 stack"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <div className="flex items-center justify-between bg-gray-800 p-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-white">
              Pokémon Playground
            </div>
            <div className=" ml-8 flex gap-6 text-white">
              <Link href={"/"}>Pokemon</Link>
              <Link href={"/fusionmons"}>Fusionmons</Link>
            </div>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
