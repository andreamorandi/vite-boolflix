<script>
import { store } from "../store";

export default {
    name: "AppSearch",
    emits: ["search"],
    data() {
        return {
            store
        };
    },
};
</script>

<template>
    <div class="search">
        <input type="text" placeholder="Inserisci film o serie" v-model="store.searchKey">
        <button @click="$emit('search')">Cerca</button>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
@use "../styles/partials/mixins" as *;
    .search {
        @include flex();
        input {
            width: 50%;
            max-width: 300px;
            height: 3rem;
            padding: .5rem;
            border: 2px solid dimgray;
            border-radius: 2px 0 0 2px;
            &:focus {
                outline: none;
                border: 2px solid $secondary-color;
                outline-offset: 0;
            }
        }
        button {
            width: 6rem;
            height: 3rem;
            border: none;
            border-radius: 0 2px 2px 0;
            color: white;
            background-color: $secondary-color;
            &:active {
                outline: 2px solid $secondary-color;
                opacity: .8;
            }
        }
    }
</style>