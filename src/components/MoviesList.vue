<template>
  <div v-if="loading" class="loader-wrapper">
    <FadeLoader color="#4caf50" />
  </div>
  <h1>Popular Movies</h1>
  <ul class="movies">
    <li v-for="movie in movies" :key="movie.id" class="movie-item">
      <img
        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        :alt="movie.title"
      />
      <div class="movie-item-title-wrap">
        <h3>{{ movie.title }}</h3>
        <router-link :to="'/movie/' + movie.id" class="movie-button">
          Details
        </router-link>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getMovies } from "@/api/movies.js";
import { FadeLoader } from "vue3-spinner";

const movies = ref([]);
const loading = ref(true);

const loadMovies = async () => {
  try {
    movies.value = await getMovies();
  } catch (error) {
    console.log("Error fetching movies:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadMovies);
</script>

<style scoped>
.movies {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.movie-item {
  width: calc(20% - 16px);
  text-align: center;
  border-radius: 5px;
}

.movie-item-title-wrap {
  padding-top: 4px;
  padding-bottom: 2px;
  border: 1px solid #679969ed;
  border-top: none;
}

.movie-item img {
  width: 100%;
  height: auto;
}

.movie-button:hover {
  color: #45a049;
}

h3 {
  font-size: 16px;
}

.loader-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(68, 67, 67, 0.8);
  z-index: 1000;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .movie-item h3 {
    font-size: 14px;
  }
  .movie-item {
    width: calc(25% - 16px);
    text-align: center;
  }
}
@media screen and (min-width: 475px) and (max-width: 767px) {
  .movies {
    flex-direction: row;
    padding-left: 20px;
    padding-right: 20px;
    flex-wrap: wrap;
  }
  .movie-item {
    width: calc(50% - 16px);
    text-align: center;
  }
  .movie-item h3 {
    font-size: 16px;
  }
}
@media screen and (min-width: 320px) and (max-width: 475px) {
  .movies {
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
  }
  .movie-item {
    width: 100%;
    text-align: center;
  }
}
</style>
