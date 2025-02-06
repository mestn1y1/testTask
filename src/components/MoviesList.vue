<template>
  <h1>Popular Movies</h1>
  <ul class="movies">
    <li v-for="movie in movies" :key="movie.id" class="movie-item">
      <img
        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        :alt="movie.title"
      />
      <h3>{{ movie.title }}</h3>
      <router-link :to="'/movie/' + movie.id" class="movie-button">
        Details
      </router-link>
    </li>
  </ul>
</template>

<script>
import { ref, onMounted } from "vue";
import { getMovies } from "@/api/movies.js";

export default {
  name: "MoviesList",
  setup() {
    const movies = ref([]);

    const loadMovies = async () => {
      movies.value = await getMovies();
    };

    onMounted(loadMovies);

    return { movies };
  },
};
</script>

<style scoped>
.movies {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.movie-item {
  width: calc((100% - 10px) / 6);
  text-align: center;
}

.movie-item img {
  width: 100%;
  height: auto;
}
</style>
