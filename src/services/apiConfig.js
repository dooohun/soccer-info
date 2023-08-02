export const BASE_URL = process.env.REACT_APP_BASE_URL

export const PREPARE_HEADERS = (headers) => {
  headers.set("x-rapidapi-host", "v3.football.api-sports.io");
  headers.set("x-rapidapi-key", process.env.REACT_APP_API_KEY);
  return headers;
};
