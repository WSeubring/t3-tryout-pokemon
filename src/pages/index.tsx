import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import { getTypePath, pokemonTypeToColor } from "../utils/pokemon";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const Home: NextPage = () => {
  const typesQuery = api.pokemon.listTypes.useQuery();
  const listPokemonsQuery = api.pokemon.listPokemon.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      listPokemonsQuery.fetchNextPage().catch((err) => console.log(err));
    }
  }, [inView]);

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
      <main className="flex min-h-screen flex-col items-center justify-center bg-orange-200 ">
        <h1 className="m-4 text-6xl font-bold text-gray-800">
          Pokémon Playground
        </h1>
        <div>
          <div className="flex w-[80vw] flex-wrap gap-4 rounded-lg border bg-white p-4 text-lg font-semibold">
            {typesQuery.isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {typesQuery.data?.results
                  .filter((type) => !["unknown", "shadow"].includes(type.name))
                  .map((type, i) => (
                    <motion.button
                      animate={{
                        scale: [0, 1.1, 1],
                        rotate: [0, 15, 0],
                        opacity: [0.75, 1],
                        transition: {
                          duration: 0.3,
                          delay: i * 0.05,
                        },
                      }}
                      whileHover={{
                        rotate: 5,
                        transition: {
                          duration: 0.2,
                        },
                      }}
                      key={type.name}
                    >
                      <Image
                        src={getTypePath(type.name)}
                        alt={type.name}
                        width={100}
                        height={100}
                      ></Image>
                    </motion.button>
                  ))}
              </>
            )}
          </div>
        </div>
        {listPokemonsQuery.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-4 grid grid-cols-4 gap-4">
            {listPokemonsQuery.data?.pages.map((page) =>
              page?.items.map((pokemon, i) => (
                <motion.div
                  animate={{
                    scale: [0, 1.05, 1],
                    opacity: [0.25, 1],
                    transition: {
                      duration: 0.2,
                      delay: i * 0.05,
                    },
                  }}
                  key={i}
                  className={
                    "h-80 rounded-md border-2 border-gray-500/50 bg-white p-4 text-center capitalize shadow-md"
                  }
                >
                  <span className="text-lg font-bold ">{pokemon.name}</span>
                  <Image
                    src={pokemon.sprites.front_default ?? ""}
                    alt={`${pokemon.name} sprite`}
                    width={200}
                    height={200}
                  ></Image>
                  <div className="flex justify-center gap-1">
                    {pokemon.types.map((type) => (
                      <Image
                        key={type.type.name}
                        src={getTypePath(type.type.name)}
                        alt={type.type.name}
                        width={100}
                        height={100}
                      ></Image>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
            {listPokemonsQuery.isFetchingNextPage &&
              Array(10)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-80 animate-pulse rounded-md border-2 border-gray-500/50 bg-white p-4 text-center capitalize shadow-md"
                  ></div>
                ))}
            <button
              ref={ref}
              onClick={() => {
                listPokemonsQuery
                  .fetchNextPage()
                  .catch((err) => console.log(err));
              }}
            >
              Load More
            </button>
          </div>
        )}

        {/* <button
          ref={ref}
          onClick={() => {
            listPokemonsQuery.fetchNextPage().catch((err) => console.log(err));
          }}
        >
          Load More
        </button> */}
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
