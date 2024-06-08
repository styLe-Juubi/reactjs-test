export const getTomorrowWeather = (weather) => {
  if (weather) {
    const today = new Date();
    const tomorrow = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
    const filteredList = weather.list.filter((w) => {
      const weatherDate = new Date(w.dt_txt);
      return (
        weatherDate.getFullYear() === tomorrow.getFullYear() &&
        weatherDate.getMonth() === tomorrow.getMonth() &&
        weatherDate.getDate() === tomorrow.getDate()
      );
    });

    if (filteredList.length === 0) {
      return null;
    }

    const minTemp = Math.min(...filteredList.map((w) => w.main.temp_min));
    const maxTemp = Math.max(...filteredList.map((w) => w.main.temp_max));
    const avgTemp =
      filteredList.reduce((sum, w) => sum + w.main.temp, 0) /
      filteredList.length;
    const humidity =
      filteredList.reduce((sum, w) => sum + w.main.humidity, 0) /
      filteredList.length;
    const mainWeather = filteredList[0].weather[0];

    return {
      temp: avgTemp.toFixed(0),
      tempMin: minTemp.toFixed(0),
      tempMax: maxTemp.toFixed(0),
      humidity: humidity.toFixed(0),
      icon: mainWeather.icon,
      description: mainWeather.description,
      date: tomorrow,
      cityName: weather.city.name,
      country: weather.city.country,
    };
  }
  return null;
};
