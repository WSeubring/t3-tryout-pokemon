import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

import { PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

export const pokemonRouter = createTRPCRouter({
  listTypes: publicProcedure.query(() => {
    return api.listTypes();
  }),
  listPokemon: publicProcedure
    .input(
      z.object({
        limit: z.number().nullish(),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input }) => {
      const limit = input?.limit ?? 20;
      const cursor = input?.cursor ?? 0;

      const promises = [];
      for (let i = cursor + 1; i <= cursor + limit; i++) {
        promises.push(api.getPokemonById(i));
      }

      const items = await Promise.all(promises);
      return {
        items,
        nextCursor: cursor + limit,
      };
    }),
});
