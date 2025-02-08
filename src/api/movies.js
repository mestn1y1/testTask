import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovies = async (page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?language=uk-UK&include_image_language=uk&api_key=${API_KEY}&page=${page}`
  );
  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?language=uk-UK&include_image_language=uk&api_key=${API_KEY}`
  );
  return response.data;
};
