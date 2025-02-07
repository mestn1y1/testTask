<template>
  <div v-if="loading" class="loader-wrapper">
    <FadeLoader color="#4caf50" />
  </div>
  <div v-if="movie" class="container">
    <img
      :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
      alt="Movie Poster"
    />
    <div class="details-wrap">
      <h1>{{ movie.title }}</h1>
      <p class="overview">{{ movie.overview }}</p>
      <p>
        Release Date: <span>{{ movie.release_date }}</span>
      </p>
      <p>
        Genre :
        <span>{{ movie.genres.map((genre) => genre.name).join(", ") }}</span>
      </p>
      <p>
        Rating: <span>{{ movie.vote_average }}</span>
      </p>
      <p>
        Budget :<span>
          {{
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(movie.budget)
          }}</span
        >
      </p>
      <a
        v-if="movie.homepage"
        :href="movie.homepage"
        class="home-page-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Home page
      </a>
    </div>
  </div>
  <div v-else>
    <p>Loading movie details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getMovieDetails } from "../api/movies.js";
import { FadeLoader } from "vue3-spinner";

const movie = ref(null);
const route = useRoute();
const movieId = route.params.id;
const loading = ref(true);

const loadMovieDetails = async () => {
  try {
    movie.value = await getMovieDetails(movieId);
  } catch (error) {
    console.error("Error fetching movie details:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadMovieDetails);
</script>

<style scoped>
.container {
  padding: 32px 20px;
  display: flex;
  gap: 24px;
}
.details-wrap {
  text-align: left;
}

.home-page-link {
  display: block;
  margin-top: 24px;
  cursor: pointer;
}

.home-page-link:hover {
  color: #6ca56e;
}

span {
  margin-left: 8px;
  color: #6ca56e;
}

h1 {
  font-size: 30px;
  margin-bottom: 32px;
}
img {
  max-width: 100%;
  height: auto;
}
p {
  margin-bottom: 24px;
}
.overview {
  margin-bottom: 36px;
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

@media screen and (min-width: 320px) and (max-width: 767px) {
  .container {
    flex-direction: column;
  }
  h1 {
    font-size: 26px;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .container {
    padding: 52px 20px;
  }
  img {
    width: 55.5%;
  }
  h1 {
    font-size: 26px;
  }
}
</style>
