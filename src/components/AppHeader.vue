<script>
import AppSearch from "./AppSearch.vue";

export default {
    name: "AppHeader",
    components: {
        AppSearch
    },
    data() {
        return {

        };
    },
};
</script>

<template>
    <header>
        <img src="https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png" alt="netflix logo">
        <AppSearch @search="$emit('search')" class="w-50 d-flex justify-content-end"/>
    </header>
</template>

<style lang="scss" scoped>
@use "../styles/partials/mixins" as *;
@use "../styles/partials/variables" as *;
header {
    width: 100%;
    height: 110px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    @include flex();
    padding: 0 20px;
    background-color: $primary-color;
    img {
        width: 30%;
        min-width: 150px;
        max-width: 300px;
    }
    AppSearch {
        width: 70%;
    }
}
</style>