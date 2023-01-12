import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

import { PokemonClient } from "pokenode-ts";
import { FusionClient } from "../../client/fusionClient";

const api = new PokemonClient();
const fusionApi = new FusionClient();

export const pokemonRouter = createTRPCRouter({
  listFusionmon: publicProcedure
    .input(
      z.object({
        limit: z.number().nullish(),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input }) => {
      const limit = input?.limit ?? 20;
      const cursor = input?.cursor ?? 0;

      const promises = Object.keys(Array(limit).fill(0)).map(() =>
        fusionApi.getFusionmon()
      );

      return {
        items: await Promise.all(promises),
        nextCursor: cursor + limit,
      };
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
