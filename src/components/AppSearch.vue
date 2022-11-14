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
    <div class="d-flex">
        <input type="text" placeholder="Inserisci film o serie" class="form-control" v-model="store.searchKey">
        <button class="btn btn-primary" @click="$emit('search')">Cerca</button>
    </div>
</template>

<style lang="scss" scoped>

</style>