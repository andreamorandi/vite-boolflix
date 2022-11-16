import { reactive } from "vue";

export const store = reactive({
    apiMoviesURL: "https://api.themoviedb.org/3/search/movie",
    apiSeriesURL: "https://api.themoviedb.org/3/search/tv",
    apiImagesURL: "https://image.tmdb.org/t/p/w342",
    apiKey: "b5339bdd4da3039835dde6444839cc9b",
    searchKey: "",
    loading: false,
    movies: [],
    series: [],
    moviesGenres: [],
    seriesGenres: [],
    genresNames: [],
    filteredMoviesGenres: [],
    moviesFilter: "",
});