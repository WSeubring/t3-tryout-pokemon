import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

import { PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

export const pokemonRouter = createTRPCRouter({
  listTypes: publicProcedure.query(() => {
    return api.listTypes();
  }),
});
