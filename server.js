const express = require('express');
const serverRoutes = require('./routes/server-routes');
const lastFmRoutes = require('./routes/lastfm-routes');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Book Builder Database'))

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', serverRoutes);
app.use('/data', lastFmRoutes);

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});