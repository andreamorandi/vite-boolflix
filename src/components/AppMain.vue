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
        <div class="container">
            <section>
                <h2 v-if="store.movies.length">Film</h2>
                <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-5">
                    <AppCard v-for="movie in store.movies" :key="movie.id" :item="movie" v-show="movie.poster_path" class="col" />
                </div>
            </section>
            <section>
                <h2 v-if="store.series.length">Serie TV</h2>
                <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-5">
                    <AppCard v-for="currSeries in store.series" :key="currSeries.id" :item="currSeries" v-show="currSeries.poster_path" />
                </div>
            </section>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
main {
    margin-top: 110px;
    margin-bottom: 60px;
    color: white;
    background-color: $primary-color;
    h2 {
        text-align: center;
        margin-top: 3rem;
        margin-bottom: 2rem;
        padding-top: .5rem;
    }
    p {
        display: inline-block;
    }
}
</style>