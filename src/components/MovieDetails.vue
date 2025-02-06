<template>
  <div v-if="movie">
    <h1>{{ movie.title }}</h1>
    <img
      :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
      alt="Movie Poster"
    />
    <p>{{ movie.overview }}</p>
    <p>Release Date: {{ movie.release_date }}</p>
    <p>Rating: {{ movie.vote_average }}</p>
  </div>
  <div v-else>
    <p>Loading movie details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getMovieDetails } from "../api/movies.js"; 

const movie = ref(null);
const route = useRoute();
const movieId = route.params.id; 

const loadMovieDetails = async () => {
  try {
    movie.value = await getMovieDetails(movieId); 
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
};

onMounted(loadMovieDetails);
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin-bottom: 1em;
}
img {
  max-width: 100%;
  height: auto;
}
</style>