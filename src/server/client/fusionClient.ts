import axios from "axios";
import { type Pokemon, PokemonClient, PokemonType } from "pokenode-ts";
import _ from "lodash";

interface FusionmonResponse {
  name: string;
  image_url: string;
  fused: {
    head: string;
    body: string;
  };
}

export class FusionClient {
  url: string;
  client: PokemonClient;

  constructor() {
    this.client = new PokemonClient();
    this.url = "https://keith.api.stdlib.com/pokefusion@0.2.0/";
  }

  async getRandomPokemon() {
    // Get a random number between 1-151
    const number = Math.floor(Math.random() * 151) + 1;
    const pokemon = this.client.getPokemonById(number);
    return pokemon;
  }

  async getFusionmon() {
    console.log("getFusionmon");
    const pokemons = await Promise.all([
      this.getRandomPokemon(),
      this.getRandomPokemon(),
    ]);
    console.log("pokemons", pokemons);
    const response = await axios.post<FusionmonResponse>(this.url, {
      bodyPokemon: pokemons[0].name,
      headPokemon: pokemons[1].name,
    });
    console.log("response", response.data);
    const fusionmon: Pokemon = this.mergePokemon(
      pokemons[0],
      pokemons[1],
      response.data
    );
    console.log("fusionmon", fusionmon);
    return fusionmon;
  }

  getUniqueTypes(pokemon1: Pokemon, pokemon2: Pokemon): PokemonType[] {
    const types = _.uniqBy(
      [...pokemon1.types, ...pokemon2.types],
      (type) => type.type.name
    );
    return types;
  }

  getRandomElements<T>(array: T[], count: number): T[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  mergePokemon(
    pokemon1: Pokemon,
    pokemon2: Pokemon,
    fusionmon: FusionmonResponse
  ): Pokemon {
    const types = this.getUniqueTypes(pokemon1, pokemon2);
    return {
      ...pokemon1,
      name: fusionmon.name,
      types: this.getRandomElements(types, 2),
      sprites: {
        ...pokemon1.sprites,
        front_default: fusionmon.image_url,
      },
    };
  }
}
