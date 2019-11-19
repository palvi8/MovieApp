const API_KEY = 'fba43c342279eb0dfa82ccbac547f06d';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/original/';

export var api = {
    LATEST_MOVIES: () => {
        return `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&include_adult=false`
    },

    TRENDING_MOVIES: () => {
        return `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    },

    POPULAR_MOVIES: () => {
        return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    
    },
    GENRES: () => {
        return `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    },
    MOVIE_DETAIL: (movie_id) => {
        return `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
    },
    SIMILAR_MOVIES: (movie_id) => {
        return `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US&page=1`
    },
    ACTOR_DETAIL: (ACTOR_ID) => {
        return `https://api.themoviedb.org/3/person/${ACTOR_ID}?api_key=${API_KEY}&language=en-US`
    },    
    ACTOR_FILMOGRAPHY: (ACTOR_ID) => {
        return `https://api.themoviedb.org/3/person/${ACTOR_ID}/movie_credits?api_key=${API_KEY}&language=en-US`
    }       

}


