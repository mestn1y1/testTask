<template>
  <div v-if="loading" class="loader-wrapper">
    <FadeLoader color="#4caf50" />
  </div>

  <h1 class="title">Популярні фільми</h1>

  <input
    type="text"
    v-model="searchQuery"
    placeholder="Шукати фільм..."
    @input="filterMovies"
    class="search-box"
  />

  <div class="pagination" v-if="filteredMovies.length >= 20 && totalPages > 1">
    <button @click="changePage('prev')" :disabled="page <= 1 || loading">
      Попередня
    </button>
    <span>ст.. {{ page }} з {{ totalPages }}</span>
    <button
      @click="changePage('next')"
      :disabled="page >= totalPages || loading"
    >
      Наступна
    </button>
  </div>
  <ul v-if="filteredMovies.length > 0" class="movies">
    <li v-for="movie in filteredMovies" :key="movie.id" class="movie-item">
      <img
        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        :alt="movie.title"
      />
      <div class="movie-item-title-wrap">
        <h3>{{ movie.title }}</h3>
        <router-link :to="'/movie/' + movie.id" class="movie-button">
          Детальніше
        </router-link>
      </div>
    </li>
  </ul>

  <div v-else class="container-for-message">
    <h3>Немає результатів</h3>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import { getMovies } from "@/api/movies.js";
import { FadeLoader } from "vue3-spinner";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const searchQuery = inject("searchQuery");
const page = inject("page");

const movies = ref([]);
const filteredMovies = ref([]);
const loading = ref(true);
const totalPages = ref(1);

const loadMovies = async () => {
  loading.value = true;

  try {
    const data = await getMovies(page.value);
    movies.value = data.results;
    filteredMovies.value = movies.value;
    totalPages.value = data.total_pages;
  } catch (error) {
    toast("Помилка при отриманні фільмів", {
      type: "error",
      position: "top-right",
      autoClose: 2000,
    });
  } finally {
    loading.value = false;
  }
};

const changePage = (direction) => {
  if (direction === "next" && page.value < totalPages.value) {
    page.value++;
  } else if (direction === "prev" && page.value > 1) {
    page.value--;
  }
  loadMovies();
};

const filterMovies = () => {
  if (!searchQuery.value) {
    filteredMovies.value = movies.value;
  } else {
    filteredMovies.value = movies.value.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
};

onMounted(() => loadMovies());
</script>

<style scoped>
.title {
  margin-top: 24px;
}
.search-box {
  padding: 10px;
  margin: 10px 0;
  width: 300px;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.movies {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  min-height: 710px;
}

.movie-item {
  width: calc(20% - 16px);
  text-align: center;
  border-radius: 5px;
}

.movie-item-title-wrap {
  padding-top: 10px;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  border: 1px solid #679969ed;
  border-top: none;
}

.movie-item img {
  width: 100%;
  height: 450px;
}

.movie-button:hover {
  color: #45a049;
}

h3 {
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.container-for-message {
  height: 710px;
  padding-top: 300px;
}

.container-for-message h3 {
  font-size: 40px;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

.pagination button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.pagination button:hover {
  background-color: #45a049;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .movie-item h3 {
    font-size: 14px;
  }
  .movie-item {
    width: calc(25% - 16px);
    text-align: center;
  }
  .movie-item img {
    height: 320px;
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
  .search-box {
    width: 280px;
  }
  .movies {
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
    gap: 40px;
  }
  .movie-item {
    width: 100%;
    text-align: center;
  }
  .movie-item img {
    height: auto;
  }

  .title {
    font-size: 30px;
  }
  .pagination {
    font-size: 14px;
  }

  .pagination button {
    padding: 8px;
  }
}
</style>
