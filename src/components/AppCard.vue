<script>
import { store } from "../store";

export default {
    name: "AppCard",
    props: {
        item: Object
    },
    data() {
        return {
            store,
            flags: ["de", "en", "es", "fr", "it", "ja", "pt"]
        };
    },
    computed: {
        getTitle() {
            return this.item.title ? this.item.title : this.item.name;
        },
        getOriginalTitle() {
            return this.item.original_title ? this.item.original_title : this.item.original_name;
        }
    },
    methods: {
        getImagePath(image) {
            return new URL(`../assets/img/${image}`, import.meta.url).href;
        }
    },
}
</script>

<template>
    <div>
        <h3>Titolo: {{ getTitle }}</h3>
        <p>Titolo originale: {{ getOriginalTitle }}</p>
        <div>
            <img :src="getImagePath(`${item.original_language}_flag.png`)" :alt="`${item.original_language} flag`" v-if="flags.includes(item.original_language)">
            <p v-else>Lingua: {{ item.original_language }}</p>
        </div>
        <div>
            <span v-for="number in Math.ceil(item.vote_average)">
                <i class="fa-solid fa-star"></i>
            </span>
        </div>

        <img :src="store.apiImagesURL + item.poster_path" :alt="`${item.title} image`">
        <br/>
    </div>
</template>

<style>

</style>