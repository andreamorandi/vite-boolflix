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
            store,
            toShowMovies: []
        }
    },
    methods: {
        filterMovies(movie) {
            if (this.store.moviesFilter) {
                return movie.genre_ids.includes(this.store.moviesFilter) ? true : false;
            }
            return true;
        },
    },
};
</script>

<template>
    <main>
        <div class="container">
            <section>
                <div class="heading" v-if="store.movies.length">
                    <h2>Film</h2>
                    <select class="form-select" aria-label="Default select example" v-model="store.moviesFilter">
                        <option value="">Filtra per genere</option>
                        <option v-for="filteredMovieGenre in store.filteredMoviesGenres" :key="filteredMovieGenre.id" :value="filteredMovieGenre.id">{{ filteredMovieGenre.name }}</option>
                    </select>
                </div>
                <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-5">
                    <AppCard v-for="movie in store.movies" :key="movie.id" :item="movie" v-show="movie.poster_path && filterMovies(movie)" class="col" />
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
    .heading {
        display: flex;
        h2 {
            font-size: 2.5rem;
            text-align: center;
            margin-top: 3rem;
            margin-bottom: 2rem;
            padding-top: .5rem;
        }
        select {
            width: 20%;
            max-width: 300px;
            height: 3rem;
        }
    }
    p {
        display: inline-block;
    }
}
</style>