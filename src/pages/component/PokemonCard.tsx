import Image from "next/image";
import { type Pokemon } from "pokenode-ts";
import { getTypePath } from "../../utils/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div
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
      />
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
    </div>
  );
};

export default PokemonCard;
