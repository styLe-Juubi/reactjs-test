import { useState } from "react";

export const useGeolocation = () => {
  const [locationInfo, setLocationInfo] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const { geolocation } = navigator;

  const successFn = (res) => {
    setLocationInfo(res.coords);
  };

  const errorFn = (res) => {
    setLocationError(res.message);
  };

  if (!locationError && !locationInfo) {
    geolocation.getCurrentPosition(successFn, errorFn);
  }

  return { locationError, locationInfo };
};