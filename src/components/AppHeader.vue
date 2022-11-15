<script>
import AppSearch from "./AppSearch.vue";

export default {
    name: "AppHeader",
    components: {
        AppSearch
    },
    data() {
        return {

        };
    },
};
</script>

<template>
    <header>
        <AppSearch @search="$emit('search')"/>
    </header>
</template>

<style lang="scss" scoped>
    header {
        background-color: black;
    }
</style>