const { Router } = require('express');
const router = Router();
const url = `http://localhost:8080`;
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const apiKey = process.env.LAST_FM_API_KEY;

const getSearchResults = (req, res) => {

    var searchCriteria = req.params.id;

    axios
    .get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(searchCriteria)}&api_key=${apiKey}&format=json`)
    .then(response => {
            var responseData = response.data.results.trackmatches.track;
            res.json(responseData)
        })
        .catch(err => {
        })
    
}


const getTrack = (req, res) => {

    var { track, artist } = req.params;

    axios
        .get(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&format=json`)
        .then(response => {
            responseData = response.data.track;
            res.json(responseData)
        })
        .catch(err => {
        })
}

//Search
router.get('/:id', getSearchResults);


//Track
router.get('/track/:artist/:track', getTrack);


module.exports = router;