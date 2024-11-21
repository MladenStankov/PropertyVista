import { IGeoLocation } from "./getGeoLocationByAddress";

const getGeoLocationByCurrentLocation = (): Promise<IGeoLocation | null> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates: IGeoLocation = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          };
          resolve(coordinates);
        },
        () => {
          console.error("Geolocation failed");
          resolve(null);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported"));
    }
  });
};

export default getGeoLocationByCurrentLocation;
