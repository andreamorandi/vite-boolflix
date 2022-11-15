<script>
import AppCard from "./AppCard.vue";
import { store } from "../store";

export default {
    name: "AppMain",
    components: {
        AppCard
    },
    data() {
        return {
            store
        }
    },
};
</script>

<template>
    <main>
        <section>
            <h2 v-if="store.movies.length">Movies</h2>
            <AppCard v-for="movie in store.movies" :key="movie.id" :item="movie" />
        </section>
        <section>
            <h2 v-if="store.series.length">Series</h2>
            <AppCard v-for="currSeries in store.series" :key="currSeries.id" :item="currSeries" />
        </section>
    </main>
</template>

<style lang="scss" scoped>
p {
    display: inline-block;
}
</style>