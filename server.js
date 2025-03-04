const express = require('express');
const path = require('path');
const clsPost = require('./Controller/post');


const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, './View')));
app.use(express.json());

app.get('/', (req, res)=>{

    const filePath = path.join(__dirname, './View/index.html');

    res.sendFile(filePath, (err)=>{

        console.log(err);
        
    });
})

app.get('/home.json', (req, res)=>{

    async function getSectionsPosts() {
        
        const latestMovies = await clsPost.getLatestMovies();
        const topImdb = await clsPost.getTop12ImdbMovies();
        const upcomingReleases = await clsPost.getUpcomingReleases();
        const latestTvShows = await clsPost.getLatestTvShows();

        res.status(200).json([latestMovies, latestTvShows, topImdb, upcomingReleases]);
    }
    
    getSectionsPosts();
})

app.listen(port, ()=>{

    console.log('Server is listening on port 8080 ...');

    
})

