<script>
import AppSearch from "./AppSearch.vue";

export default {
    name: "AppHeader",
    components: {
        AppSearch
    },
    methods: {
        getImagePath(image) {
            return new URL(`../assets/img/${image}`, import.meta.url).href;
        },
    }
};
</script>

<template>
    <header>
        <img :src="getImagePath('logo.png')" alt="boolflix logo">
        <AppSearch @search="$emit('search')" class="w-50 d-flex justify-content-end"/>
    </header>
</template>

<style lang="scss" scoped>
@use "../styles/partials/mixins" as *;
@use "../styles/partials/variables" as *;
header {
    width: 100%;
    max-width: 2000px;
    height: 110px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
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