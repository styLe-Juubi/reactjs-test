import { useQuery } from "react-query";
import axios from "axios";
import { useStore } from "../context/store";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { IoWater } from "react-icons/io5";
import { getTomorrowWeather } from "../utils";

const useWeather = (lat, lon) => {
  return useQuery(["weather", lat, lon], async () => {
    try {
      const { data: res } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_API_KEY
        }&lang=es&units=metric`
      );
      return res;
    } catch (error) {
      throw new Error("Error fetching weather data");
    }
  });
};

export default function Weather() {
  const user = useStore((state) => state.user);
  const { isLoading, data } = useWeather(user.location.lat, user.location.lng);

  if (isLoading) {
    return <> </>;
  }

  const weather = getTomorrowWeather(data);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
      }}
    >
      {isLoading ? (
        <Skeleton variant="rectangular" width={300} height={300} />
      ) : (
        <Card
          sx={{
            display: "flex",
            padding: 2,
            maxWidth: { xs: "100%", md: 600 },
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            image={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
            sx={{ width: 200 }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h3">
                {weather.temp}°C
              </Typography>
              <Typography component="div" variant="subtitle1">
                Máxima: {weather.tempMax}°C | Mínima: {weather.tempMin}°C
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textTransform: "capitalize",
                }}
              >
                <IoWater />
                {weather.humidity}% | {weather.description}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {weather.cityName}, {weather.country}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {weather.date.toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      )}
    </Box>
  );
}
