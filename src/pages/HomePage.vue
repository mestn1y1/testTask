<template>
  <div>
    <h1>Popular Movies</h1>
    <div class="movies">
      <div v-for="movie in movies" :key="movie.id" class="card">
        <img
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
          :alt="movie.title"
        />
        <h3>{{ movie.title }}</h3>
        <router-link :to="'/movie/' + movie.id">Details</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { getMovies } from "@/api/movies.js";
import { useRoute } from "vue-router";

export default {
  setup() {
    const movies = ref([]);
    const route = useRoute(); // Получаем текущий маршрут

    // Загружаем фильмы при монтировании компонента
    const loadMovies = async () => {
      movies.value = await getMovies();
    };

    // Загружаем фильмы при изменении маршрута
    watch(
      route,
      () => {
        loadMovies();
      },
      { immediate: true }
    ); // immediate: true позволяет загрузить фильмы сразу при первом рендере

    onMounted(loadMovies);

    return { movies };
  },
};
</script>

<style scoped>
.movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}
.card {
  text-align: center;
}
</style>
