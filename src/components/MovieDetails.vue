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
      <p class="overview">
        {{ movie.overview || "Нажаль немає опису про фільм" }}
      </p>
      <p>
        Дата релізу : <span>{{ movie.release_date }}</span>
      </p>
      <p>
        Жанр :
        <span>{{ movie.genres.map((genre) => genre.name).join(", ") }}</span>
      </p>
      <p>
        Рейтинг : <span>{{ movie.vote_average }}</span>
      </p>
      <p>
        Країна :
        <span>
          {{
            movie.production_countries
              .map((country) => translateCountry(country.iso_3166_1))
              .join(", ")
          }}
        </span>
      </p>
      <p v-if="movie.tagline">
        Слоган : <span>{{ movie.tagline }}</span>
      </p>
      <p v-if="movie.budget">
        Бюджет :<span>
          {{
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(movie.budget)
          }}</span
        >
      </p>
      <p v-if="uniqueCompanies.length > 0">Студії :</p>
      <ul v-if="uniqueCompanies" class="company-img-list">
        <li v-for="company in uniqueCompanies" :key="company.id">
          <img
            v-if="company.logo_path"
            :src="'https://image.tmdb.org/t/p/w200' + company.logo_path"
            :alt="company.name"
            class="company-img"
          />
        </li>
      </ul>
      <a
        v-if="movie.homepage"
        :href="movie.homepage"
        class="home-page-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Домашня сторінка фільму
      </a>
      <button class="button-back" @click="backToMovies">До фільмів</button>
    </div>
  </div>
  <div v-else class="container-for-message">
    <h3>Не знайдено інформації ...</h3>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMovieDetails } from "../api/movies.js";
import { FadeLoader } from "vue3-spinner";
import countries from "i18n-iso-countries";
import uk from "i18n-iso-countries/langs/uk.json";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

countries.registerLocale(uk);

const movie = ref(null);
const loading = ref(true);
const route = useRoute();
const router = useRouter();
const movieId = route.params.id;

const filterUniqueByName = (companies) => {
  if (!companies) return [];
  const seen = new Set();
  return companies.filter((company) => {
    if (seen.has(company.name)) {
      return false;
    }
    seen.add(company.name);
    return true;
  });
};

const uniqueCompanies = computed(() => {
  return movie.value?.production_companies
    ? filterUniqueByName(movie.value.production_companies)
    : [];
});

const translateCountry = (code) => {
  return countries.getName(code, "uk") || code;
};

const backToMovies = () => {
  router.push("/movies");
};

const loadMovieDetails = async () => {
  try {
    movie.value = await getMovieDetails(movieId);
  } catch (error) {
    toast("Помилка при отриманні деталей фільму", {
      type: "error",
      position: "top-right",
      autoClose: 2000,
    });
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
  min-height: 818px;
  background: #3e413e;
}
.details-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: left;
}

.home-page-link {
  display: inline-block;
  cursor: pointer;
  width: 200px;
  margin-bottom: 24px;
}

.home-page-link:hover {
  color: #6ca56e;
}

.company-img-list {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}
.company-img {
  display: inline-block;
  width: 100px;
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

.container-for-message {
  height: 810px;
  padding-top: 300px;
}

.container-for-message h3 {
  font-size: 46px;
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

.button-back {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  align-self: flex-start;
  margin-top: auto;
}

.button-back:hover {
  background-color: #45a049;
}

@media screen and (min-width: 320px) and (max-width: 767px) {
  .container {
    flex-direction: column;
  }
  h1 {
    font-size: 26px;
  }
  .button-back {
    width: 160px;
  }
  .company-img {
    width: 50px;
    max-height: 40px;
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
  .company-img {
    width: 100px;
    max-height: 50px;
  }
}
</style>
