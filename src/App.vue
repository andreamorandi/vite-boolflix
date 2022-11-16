<script>
import axios from "axios";
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
import { store } from "./store";

export default {
  components: {
    AppHeader,
    AppMain
  },
  data() {
    return {
      store
    };
  },
  created() {
    const urlParams = {
      api_key: this.store.apiKey,
      language: "it",
    }
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {params: urlParams})
      .then(
        (resp) => {
          this.store.genresNames = resp.data.genres;
        }
      )
  },
  methods: {
    search() {
      const urlParams = {
        api_key: this.store.apiKey,
        language: "it",
        query: this.store.searchKey
      }
      this.getMovies(urlParams);
      this.getSeries(urlParams);
    },
    getMovies(urlParams) {
      axios
        .get(this.store.apiMoviesURL, {params: urlParams})
        .then(
          (resp) => {
            this.store.movies = resp.data.results;
            this.getMoviesGenres();
            console.log(resp.data.results);
          }
        )
    },
    getSeries(urlParams) {
      axios
        .get(this.store.apiSeriesURL, {params: urlParams})
        .then(
          (resp) => {
            this.store.series = resp.data.results;
            // this.getSeriesGenres();
            console.log(resp.data);
          }
        )
    },
    getMoviesGenres() {
      this.store.moviesGenres = [];
      this.store.movies.forEach(movie => {
        movie.genre_ids.forEach(genre_id => {
          !this.store.moviesGenres.includes(genre_id) ? this.store.moviesGenres.push(genre_id) : '';
        });
      });
      console.log(this.store.moviesGenres);
      this.filterMoviesGenres();
    },
    filterMoviesGenres() {
      this.store.filteredMoviesGenres = [];
      this.store.moviesGenres.forEach(genreId => {
          this.store.genresNames.forEach(genreName => {
              if (genreId === genreName.id) {
                  this.store.filteredMoviesGenres.push({id: genreName.id, name: genreName.name});
                  console.log(this.store.filteredMoviesGenres);
              }
          });
      });
    }
  },
};
</script>

<template>
  <AppHeader @search="search" />
  <AppMain />
</template>

<style lang="scss">
@use "./styles/general.scss" as *;
</style>