<script>
import axios from "axios";
import { store } from "../store";

export default {
    name: "AppCard",
    props: {
        item: Object,
        type: String
    },
    data() {
        return {
            store,
            flags: ["de", "en", "es", "fr", "it", "ja", "pt"],
            showInfo: false,
            cast: [],
            genres: []
        };
    },
    created() {
            const urlParams = {
                api_key: this.store.apiKey,
                language: "it",
            }
            axios
                .get(`https://api.themoviedb.org/3/${this.type}/${this.item.id}/credits`, {params: urlParams})
                .then(
                    (resp) => {
                        this.cast = resp.data.cast.slice(0, 5);
                    }
                )
                .catch(
                    (err) => {
                        console.log(`${this.type} id ${this.item.id}: cast request error`, err)
                    }
                )
            axios
                .get(`https://api.themoviedb.org/3/${this.type}/${this.item.id}`, {params: urlParams})
                .then(
                    (resp) => {
                        this.genres = resp.data.genres;
                    }
                )
                .catch(
                    (err) => {
                        console.log(`${this.type} id ${this.item.id}: genres request error`, err)
                     }
                )
    },
    computed: {
        getTitle() {
            return this.item.title ? this.item.title : this.item.name;
        },
        getOriginalTitle() {
            return this.item.original_title ? this.item.original_title : this.item.original_name;
        },
        getStarsNumber() {
            return Math.ceil(this.item.vote_average / 2);
        },
    },
    methods: {
        getImagePath(image) {
            return new URL(`../assets/img/${image}`, import.meta.url).href;
        },
        toggleInfo() {
            this.showInfo = !this.showInfo;
        }
    },
}
</script>

<template>
    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img :src="store.apiImagesURL + item.poster_path" :alt="`${item.title} image`" />
            </div>
            <div class="flip-card-back">
                <div class="info-icon">
                    <i class="fa-solid fa-circle-info" @click="toggleInfo"></i>
                </div>
                <div class="info" v-if="this.showInfo">
                    <div class="info-icon">
                        <i class="fa-solid fa-circle-xmark" @click="toggleInfo"></i>
                    </div>
                    <template v-if="cast.length">
                        <h5>Cast:</h5>
                        <p v-for="actor in cast" :key="actor.id">
                            {{ actor.name }}
                        </p>
                    </template>
                    <template v-if="genres.length">
                        <h5>Generi:</h5>
                        <p v-for="genre in genres" :key="genre.id">
                            {{ genre.name }}
                        </p>
                    </template>
                </div>
                <template v-else>
                    <h5>Titolo:&MediumSpace;</h5>
                    <p>{{ getTitle }}</p>
                    <h5>Titolo originale:&MediumSpace;</h5>
                    <p>{{ getOriginalTitle }}</p>
                    <div class="lang">
                        <h5>Lingua:&MediumSpace;</h5>
                        <img :src="getImagePath(`${item.original_language}_flag.png`)" :alt="`${item.original_language} flag`" v-if="flags.includes(item.original_language)">
                        <p v-else>{{ item.original_language }}</p>
                    </div>
                    <div class="vote" v-show="item.vote_count">
                        <h5>Voto:&MediumSpace;</h5>
                        <span v-for="number in 5">
                            <i class="fa-star" :class="number <= getStarsNumber ? 'fa-solid' : 'fa-regular'"></i>
                        </span>
                    </div>
                    <div class="overview" v-show="item.overview">
                        <h5>Trama:&MediumSpace;</h5>
                        <p>{{ item.overview }}</p>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
.flip-card {
    height: 300px;
    perspective: 1000px;
    &:hover .flip-card-inner {
        transform: rotateY(180deg);
    }
    .flip-card-inner {
        width: 100%;
        height: 100%;
        position: relative;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
        .flip-card-front, .flip-card-back {
            width: 100%;
            height: 100%;
            position: absolute;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
        }
        .flip-card-front {
            color: black;
            overflow: hidden;
            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .flip-card-back {
            position: relative;
            transform: rotateY(180deg);
            overflow: auto;
            padding: 1rem;
            padding-top: 1.5rem;
            color: white;
            background-color: black;
            * {
                text-align: left;
            }
            h5, p{
                display: inline-block;
            }
            img {
                height: 1rem;
                line-height: 1rem;
                vertical-align: text-top;
            }
            .info-icon {
                position: absolute;
                top: .5rem;
                right: .75rem;
                cursor: pointer;
            }
            .info {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                right: 0;
                overflow: auto;
                border-radius: 7.5px;
                padding: 1rem;
                color: black;
                background-color: white;
                h5, p {
                    display: block;
                }
            }
            .vote {
                margin: 1rem 0;
                i {
                    color: $stars-color;
                }
            }
        }
    }
}
</style>