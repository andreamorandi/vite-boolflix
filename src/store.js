import { reactive } from "vue";

export const store = reactive({
    apiURL: "https://api.themoviedb.org/3/search/movie",
    apiSeriesURL: "https://api.themoviedb.org/3/search/tv",
    apiKey: "b5339bdd4da3039835dde6444839cc9b",
    searchKey: "",
    loading: false,
    movies: [],
    series: []
});