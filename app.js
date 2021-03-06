const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const apps = require('./app-data.js');

app.get('/apps', (req, res) => {
    const { genre= "", sort } = req.query;

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be either rating or app.')
        }
    }

    let results = apps
        .filter(app => 
            app
                .Genres
                .toLowerCase()
                .includes(genre.toLowerCase()));

    if (sort) {
        results
            .sort((a, b) => {
                return a[sort] > b[sort] 
                    ? 1 
                    : a[sort] < b[sort] 
                        ? -1 
                        : 0;
            });
    }

    res
        .json(results);
});

module.exports = app;