export interface IAddress {
  streetNumber: string;
  streetName: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
}

export interface IGeoLocation {
  longitude: number;
  latitude: number;
}

export default async function getGeoLocationByAddress({
  streetNumber,
  streetName,
  postalCode,
  city,
  state,
  country,
}: IAddress): Promise<IGeoLocation | null> {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!API_KEY) {
      throw new Error("API key is missing.");
    }

    const address = `${streetNumber} ${streetName}, ${postalCode} ${city}, ${state}, ${country}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`;

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      console.log("Failed to fetch from Google Maps API");
      return null;
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.log("No geolocation found for the provided address");
      return null;
    }

    const location = data.results[0]?.geometry.location;

    if (!location || !location.lat || !location.lng) {
      console.log("Invalid location data received");
      return null;
    }

    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  } catch (error) {
    console.error("Error getting GeoLocation: ", error);
    return null;
  }
}
