const { Router } = require('express');
const router = Router();
const path = require('path');
const axios = require('axios');

const apiKey = process.env.PDF_API_KEY;
const apiSecret = process.env.PDF_SECRET_KEY;

const pageTemplate = 58821;


router.post('/', getUser, async (req, res) => {
    
    const pdfRequestHeaders = {
      'X-Auth-Key': apiKey,
      'X-Auth-Secret': apiSecret,
      'X-Auth-Workspace': 'beeson.alexander@gmail.com',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const bookTitle = req.book.title

    const book = req.book.pages.map()

    axios
      .post(`https://us1.pdfgeneratorapi.com/api/v3/templates/${pageTemplate}/output?name=${bookTitle}?format=pdf&output=url`, book, { headers: pdfRequestHeaders })
      .then(res => { res.status(200).send(res.response, 'successfully created book pdf in Shopify')})
      .catch(err => { console.log(err) })

  });