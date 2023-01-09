export const pokemonTypeToColor = (type: string) => {
  switch (type) {
    case "normal":
      return "bg-gray-300";
    case "fire":
      return "bg-red-500";
    case "water":
      return "bg-blue-500";
    case "grass":
      return "bg-green-500";
    case "electric":
      return "bg-yellow-500";
    case "ice":
      return "bg-blue-200";
    case "fighting":
      return "bg-red-700";
    case "poison":
      return "bg-purple-500";
    case "ground":
      return "bg-yellow-700";
    case "flying":
      return "bg-blue-300";
    case "psychic":
      return "bg-pink-500";
    case "bug":
      return "bg-green-300";
    case "rock":
      return "bg-yellow-300";
    case "ghost":
      return "bg-purple-700";
    case "dragon":
      return "bg-purple-300";
    case "dark":
      return "bg-gray-700";
    case "steel":
      return "bg-gray-500";
    case "fairy":
      return "bg-pink-300";
    default:
      return "bg-gray-300";
  }
};

export const getTypePath = (type: string) => {
  switch (type) {
    case "normal":
      return "/img/normal.png";
    case "fire":
      return "/img/fire.png";
    case "water":
      return "/img/water.png";
    case "grass":
      return "/img/grass.png";
    case "electric":
      return "/img/electric.png";
    case "ice":
      return "/img/ice.webp";
    case "fighting":
      return "/img/fighting.png";
    case "poison":
      return "/img/poison.png";
    case "ground":
      return "/img/ground.webp";
    case "flying":
      return "/img/flying.webp";
    case "psychic":
      return "/img/psychic.png";
    case "bug":
      return "/img/bug.png";
    case "rock":
      return "/img/rock.png";
    case "ghost":
      return "/img/ghost.png";
    case "dragon":
      return "/img/dragon.png";
    case "dark":
      return "/img/dark.png";
    case "steel":
      return "/img/steel.png";
    case "fairy":
      return "/img/fairy.png";
    default:
      return "";
  }
};
