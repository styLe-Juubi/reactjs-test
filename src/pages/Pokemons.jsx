import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import { useStore } from "../context/store";
import { Box, Typography } from "@mui/material";

export default function Pokemons() {
  const user = useStore((state) => state.user);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPokemons = async () => {
    try {
      const pokemonPromises = user.pokemons.map((pokemon) => {
        const promise = axios.get(pokemon.url);
        return promise;
      });

      const pokemonsData = await Promise.all(pokemonPromises);

      setPokemons(pokemonsData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Typography variant="h4" fontWeight={700}>
        Pokemones
      </Typography>

      <Box
        component={"main"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mt: 3,
          mb: 4,
          gap: 2,
          justifyContent: "center",
        }}
      >
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.data.id} pokemon={pokemon.data} />
        ))}
      </Box>
    </Box>
  );
}
