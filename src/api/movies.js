import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovies = async (query = "") => {
  const url = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

  const response = await axios.get(url);
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  return response.data;
};
