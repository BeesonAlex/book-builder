const { Router } = require('express');
const router = Router();
const axios = require('axios');

const apiKey = process.env.PDF_API_KEY;
const apiSecret = process.env.PDF_SECRET_KEY;
const workspace = process.env.PDF_WORKSPACE;

const pageTemplate = 58821;
const coverTemplate = 62076;


router.post('/', async (req, res) => {
    console.log('req.body', req.body)
    
    const pdfRequestHeaders = {
      'X-Auth-Key': apiKey,
      'X-Auth-Secret': apiSecret,
      'X-Auth-Workspace': workspace,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const bookTitle = req.body.title
    const book = req.body.pages
    let responseObject = {}
    let bookResponse = ''
    let coverResponse = ''
    
    axios
    .post(`https://us1.pdfgeneratorapi.com/api/v3/templates/${pageTemplate}/output?name=${bookTitle}?format=pdf&output=url`, book, { headers: pdfRequestHeaders })
    .then(reso => { 
      bookResponse = reso.data.response
      axios
      .post(`https://us1.pdfgeneratorapi.com/api/v3/templates/${coverTemplate}/output?name=${bookTitle}?format=pdf&output=url`, bookTitle, { headers: pdfRequestHeaders })
      .then(respond => {
          coverResponse = respond.data.response
          responseObject = {
            bookResponse,
            coverResponse
          }
          res.send(responseObject)
    })
  })
    .catch(err => { 
        console.log(err) 
    })
  });

  module.exports = router;