<script>
import { store } from "../store";

export default {
    name: "AppMain",
    data() {
        return {
            store,
            flags: ["de", "en", "es", "fr", "it", "ja", "pt"]
        };
    },
    methods: {
        getImagePath(image) {
            return new URL(`../assets/img/${image}`, import.meta.url).href;
        }
    },
};
</script>

<template>
    <main>
        <h2 v-if="store.movies.length">Movies</h2>
        <ol v-for="(movie, index) in store.movies" :key="index">
            <li>
                <p>Titolo: {{ movie.title }}</p>
            </li>
            <li>
                <p>Titolo originale: {{ movie.original_title }}</p>
            </li>
            <li>
                <img :src="getImagePath(`${movie.original_language}_flag.png`)" :alt="`${movie.original_language} flag`" v-if="flags.includes(movie.original_language)">
                <p v-else>Lingua: {{ movie.original_language }}</p>
            </li>
            <li>
                <p>Voto: {{ movie.vote_average }}</p>
            </li>
            <br/>
        </ol>
        <h2 v-if="store.series.length">Series</h2>
        <ol v-for="(series, index) in store.series" :key="index">
            <li>
                <p>Titolo: {{ series.name }}</p>
            </li>
            <li>
                <p>Titolo originale: {{ series.original_name }}</p>
            </li>
            <li>
                <img :src="getImagePath(`${series.original_language}_flag.png`)" :alt="`${series.original_language} flag`" v-if="flags.includes(series.original_language)">
                <p v-else>Lingua: {{ series.original_language }}</p>
            </li>
            <li>
                <p>Voto: {{ series.vote_average }}</p>
            </li>
            <br/>
        </ol>
    </main>
</template>

<style lang="scss" scoped>

</style>