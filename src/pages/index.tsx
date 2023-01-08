import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import { pokemonTypeToColor } from "../utils/pokemon";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  const typesQuery = api.pokemon.listTypes.useQuery();

  return (
    <>
      <Head>
        <title>Playground</title>
        <meta
          name="description"
          content="This web application is used to explore different tool, libraries and ideas. The initial template is setup using the T3 stack"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-t from-orange-200 to-white">
        <h1 className="m-4 text-6xl font-bold text-gray-800">
          Pokémon Playground
        </h1>
        <div>
          {typesQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex w-[80vw] flex-wrap gap-4 rounded-lg border bg-white p-4 text-lg font-semibold shadow-md">
              {typesQuery.data?.results.map((type, i) => (
                <motion.div
                  animate={{
                    scale: [0, 1.1, 1],
                    rotate: [0, 5, 0],
                    opacity: [0.25, 1],
                    transition: {
                      duration: 0.2,
                      delay: i * 0.05,
                    },
                  }}
                  className={twMerge(
                    "rounded-md border border-gray-400 px-5 py-3 ",
                    pokemonTypeToColor(type.name)
                  )}
                  key={type.name}
                >
                  <span className="font-semibold text-black">{type.name}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;

// Auth example of the package, keep for reference

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
