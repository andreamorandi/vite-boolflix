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
    getContents() {
      const urlParams = {
        api_key: this.store.apiKey,
        query: this.store.searchKey
      }
      axios
        .get(this.store.apiMoviesURL, {params: urlParams})
        .then(
          (resp) => {
            this.store.movies = resp.data.results;
          }
        )
      axios
        .get(this.store.apiSeriesURL, {params: urlParams})
        .then(
          (resp) => {
            this.store.series = resp.data.results;
            console.log(resp.data.results);
          }
        )
    },
  },
};
</script>

<template>
  <AppHeader @search="getContents" />
  <AppMain />
</template>

<style lang="scss">
@use "./styles/general.scss" as *;
</style>