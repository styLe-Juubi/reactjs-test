import { Card, CardContent, CardMedia, Typography, Paper } from "@mui/material";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";

export default function PokemonCard({ pokemon }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 3,
        borderRadius: 3,
        mx: 2,
        minWidth: { xs: "80%", md: 300 },
        maxWidth: { xs: "80%", md: 400 },
        alignItems: "center",
        justifyContent: "center",
        boxShadow: 2,
      }}
    >
      <CardMedia
        component="img"
        image={pokemon.sprites.front_default}
        alt={`${pokemon.name} image`}
        sx={{ width: 200, height: 200, objectFit: "contain" }}
      />
      <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
        <Typography
          component="div"
          variant="h4"
          textTransform={"capitalize"}
          gutterBottom
        >
          {pokemon.name}
        </Typography>
        <Typography
          component="div"
          variant="h6"
          textTransform={"capitalize"}
          gutterBottom
        >
          Habilidades:
        </Typography>
        <Paper
          elevation={1}
          sx={{ padding: 2, borderRadius: 2, bgcolor: "#ffffff" }}
        >
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {pokemon.abilities.map((ability, index) => (
              <li
                key={index}
                style={{
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaStar style={{ marginRight: 4 }} />
                <Typography
                  component="div"
                  variant="body1"
                  textTransform={"capitalize"}
                >
                  {ability.ability.name}
                </Typography>
              </li>
            ))}
          </ul>
        </Paper>
      </CardContent>
    </Card>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sprites: PropTypes.shape({
      front_default: PropTypes.string.isRequired,
    }).isRequired,
    abilities: PropTypes.arrayOf(
      PropTypes.shape({
        ability: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};
