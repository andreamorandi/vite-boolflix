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
        filterSeries(series) {
            if (this.store.seriesFilter) {
                return series.genre_ids.includes(this.store.seriesFilter) ? true : false;
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
                    <template v-for="currMovie in store.movies" :key="currMovie.id">
                        <AppCard v-if="currMovie.poster_path && filterMovies(currMovie)" :item="currMovie" type="movie" class="col" />
                    </template>
                </div>
            </section>
            <section>
                <div class="heading" v-if="store.series.length">
                    <h2>Serie TV</h2>
                    <select class="form-select" aria-label="Default select example" v-model="store.seriesFilter">
                        <option value="">Filtra per genere</option>
                        <option v-for="filteredSeriesGenre in store.filteredSeriesGenres" :key="filteredSeriesGenre.id" :value="filteredSeriesGenre.id">{{ filteredSeriesGenre.name }}</option>
                    </select>
                </div>
                <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-5">
                    <template v-for="currSeries in store.series" :key="currSeries.id">
                        <AppCard v-if="currSeries.poster_path && filterSeries(currSeries)" :item="currSeries" type="tv" />
                    </template>
                </div>
            </section>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use "../styles/partials/mixins" as *;
@use "../styles/partials/variables" as *;
main {
    padding-top: 110px;
    margin-bottom: 60px;
    color: white;
    background-color: $primary-color;
    section:nth-child(2) {
        margin-top: 2rem;
    }
    .heading {
        width: calc(100% - 5vw);
        @include flex(row, center, center);
        position: relative;
        margin: 0 auto;
        margin-bottom: .25rem;
        h2 {
            font-size: 2.5rem;
            text-align: center;
            margin-top: 3rem;
            margin-right: 5vw;
            margin-bottom: 2rem;
            padding-top: .5rem;
        }
        select {
            width: 30%;
            max-width: 300px;
            height: 3rem;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-25%);
            border: 1px solid dimgray;
            &:focus {
                box-shadow: 0px 0px 10px 2.5px $secondary-color;
            }
        }
    }
    p {
        display: inline-block;
    }
}
</style>