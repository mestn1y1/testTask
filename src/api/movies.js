import axios from "axios";

const API_KEY = "key";
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  return response.data;
};
