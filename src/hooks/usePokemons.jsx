import { useQuery } from "react-query";
import axios from "axios";

const usePokemons = () => {
  return useQuery("pokemons", async () => {
    const { data } = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=12"
    );
    return data;
  });
};

export default usePokemons;