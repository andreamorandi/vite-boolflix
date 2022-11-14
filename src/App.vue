<script>
import axios from "axios";

export default {
  created() {
    axios
      .get("https://api.themoviedb.org/3/movie/550?api_key=b5339bdd4da3039835dde6444839cc9b&query=ciao")
      .then()
  },
};
</script>

<template>

</template>

<style lang="scss">
@use "./styles/general.scss" as *;
</style>