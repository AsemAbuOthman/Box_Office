const clsModule = require('../Model/app');
const { getUpcomingReleases, getLatestTvShows } = require('../Model/post');

const clsPost = {

    id: -1,
    title: '',
    imdb_rating: 'N/A',
    quality: '',
    year: 0,
    country: '',
    cast: '',
    views: 0,
    stars: 0,
    description: 0,
    postersUrl: [],
    mediaUrls:[],
    catigores: [],
    qualites: [],
    direcotrs: [],
    subtitles: [],
    audioes: [],

    getLatestMovies() {

        return clsModule.clsPost.getLatestMovies();
    },

    getTop12ImdbMovies() {

        return clsModule.clsPost.getTop12ImdbMovies();
    },

    getUpcomingReleases() {

        return clsModule.clsPost.getUpcomingReleases();
    },

    getLatestTvShows() {

        return clsModule.clsPost.getLatestTvShows();
    }
}


module.exports = clsPost;
