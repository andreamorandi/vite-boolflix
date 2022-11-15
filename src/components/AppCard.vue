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
    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img :src="store.apiImagesURL + item.poster_path" :alt="`${item.title} image`" />
            </div>
            <div class="flip-card-back">
                <h5>Titolo:&MediumSpace;</h5>
                <p>{{ getTitle }}</p>
                <h5>Titolo originale:&MediumSpace;</h5>
                <p>{{ getOriginalTitle }}</p>
                <div class="lang">
                    <h5>Lingua:&MediumSpace;</h5>
                    <img :src="getImagePath(`${item.original_language}_flag.png`)" :alt="`${item.original_language} flag`" v-if="flags.includes(item.original_language)">
                    <p v-else>{{ item.original_language }}</p>
                </div>
                <div class="vote">
                    <h5>Voto:&MediumSpace;</h5>
                    <span v-for="number in Math.ceil(item.vote_average)">
                        <i class="fa-solid fa-star"></i>
                    </span>
                </div>
                <div class="overview">
                    <h5>Trama:&MediumSpace;</h5>
                    <p>{{ item.overview }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
.flip-card {
    height: calc(500px - 10vw);
    min-height: 300px;
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
            transform: rotateY(180deg);
            overflow: auto;
            padding: 1rem;
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