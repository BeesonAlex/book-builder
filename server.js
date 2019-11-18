const express = require('express');
const path = require('path');
const serverRoutes = require('./routes/server-routes');
const lastFmRoutes = require('./routes/lastfm-routes');
const shopifyRoutes = require('./routes/shopify-routes');
const pdfRoutes = require('./routes/pdf-routes');
const printRoutes = require('./routes/print-routes');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

// CORS Middleware
app.use(cors());
app.options('*', cors())


// Database Middleware
var mongooseURL = process.env.DATABASE_URL;

mongoose.connect(mongooseURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Book Builder Database'))


app.use('/print/webhook/order', bodyParser.raw({ type: 'application/json' }))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// // Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.use('/users', serverRoutes);
app.use('/data', lastFmRoutes);
app.use('/shopify', shopifyRoutes);
app.use('/pdf', pdfRoutes);
app.use('/print', printRoutes);


app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});