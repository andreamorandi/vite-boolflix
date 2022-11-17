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
      .catch(
        (err) => {
        console.log(`Genres list request error`, err)
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
      this.store.searchKey = "";
      this.getMovies(urlParams);
      this.getSeries(urlParams);
    },
    getMovies(urlParams) {
      axios
        .get(this.store.apiMoviesURL, {params: urlParams})
        .then(
          (resp) => {
            this.store.moviesFilter = "";
            this.store.movies = resp.data.results;
            this.getMoviesGenres();
          }
        )
        .catch(
          (err) => {
          console.log(`Movies search error`, err)
          }
        )
    },
    getSeries(urlParams) {
      axios
        .get(this.store.apiSeriesURL, {params: urlParams})
        .then(
          (resp) => {
            this.store.seriesFilter = "";
            this.store.series = resp.data.results;
            this.getSeriesGenres();
          }
        )
        .catch(
          (err) => {
          console.log(`Series search error`, err)
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
      this.filterMoviesGenres();
      
    },
    getSeriesGenres() {
      this.store.seriesGenres = [];
      this.store.series.forEach(series => {
        series.genre_ids.forEach(genre_id => {
          !this.store.seriesGenres.includes(genre_id) ? this.store.seriesGenres.push(genre_id) : '';
        });
      });
      this.filterSeriesGenres();
    },
    filterMoviesGenres() {
      this.store.filteredMoviesGenres = [];
      this.store.moviesGenres.forEach(genreId => {
          this.store.genresNames.forEach(genreName => {
              if (genreId === genreName.id) {
                  this.store.filteredMoviesGenres.push({id: genreName.id, name: genreName.name});
              }
          });
      });
    },
    filterSeriesGenres() {
      this.store.filteredSeriesGenres = [];
      this.store.seriesGenres.forEach(genreId => {
          this.store.genresNames.forEach(genreName => {
              if (genreId === genreName.id) {
                  this.store.filteredSeriesGenres.push({id: genreName.id, name: genreName.name});
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