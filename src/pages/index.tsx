import { type NextPage } from "next";
import { api } from "../utils/api";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PokemonCard from "./component/PokemonCard";

const Home: NextPage = () => {
  const listPokemonsQuery = api.pokemon.listPokemon.useInfiniteQuery(
    {
      limit: 20,
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
  }, [inView, listPokemonsQuery]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-orange-200 ">
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
                >
                  <PokemonCard pokemon={pokemon} />
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
