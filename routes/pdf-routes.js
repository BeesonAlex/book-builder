const { Router } = require('express');
const router = Router();
const axios = require('axios');

const apiKey = process.env.PDF_API_KEY;
const apiSecret = process.env.PDF_SECRET_KEY;
const workspace = process.env.PDF_WORKSPACE;

const pageTemplate = 63401;



router.post('/', async (req, res) => {
    
    const pdfRequestHeaders = {
      'X-Auth-Key': apiKey,
      'X-Auth-Secret': apiSecret,
      'X-Auth-Workspace': workspace,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const title = req.body.title;
    const book = JSON.stringify(req.body.pages);
    let bookResponse = ''
    res.status(200)
    axios
    .post(`https://us1.pdfgeneratorapi.com/api/v3/templates/${pageTemplate}/output?name=${encodeURIComponent(title)}?format=pdf&output=url`, book, { headers: pdfRequestHeaders })
    .then(reso => { 
      bookResponse = reso.data.response
      console.log('completed interior pdf', bookResponse)
      res.send(bookResponse)
    })
    .catch(err => {
      console.log(err)
    })
  });

  module.exports = router;