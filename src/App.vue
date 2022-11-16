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
            console.log(resp.data);
          }
        )
    },
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