const { Router } = require('express');
const router = Router();
const axios = require('axios');


// Register Webhook to listen for new orders with custom books
router.post('/webhook/order', validateWebhook, fetchToken, async (req, res) => {

    const podPackage = '0850X1100FCPREPB080CW444MXX';
    let purchasedBooks = req.body.line_items.filter(data => data.variant_id == '31160253481057');

    var options = {
        method: 'POST',
        url: 'https://api.sandbox.lulu.com/print-jobs/',
        headers: {
          'Cache-Control': 'no-cache',
          'Authorization': `Bearer ${res.token.access_token}`,
          'Content-Type': 'application/json'
        },
        body: {
          "contact_email": `beeson.alexander@gmail.com`,
          "external_id": `${req.body.order_number}`,
          "line_items": purchasedBooks.map(book => {
              return (
                {
                    "external_id": `${book.id}`,
                    "printable_normalization": {
                        "cover": {
                            "source_url": `${book.properties.coverUrl}`
                        },
                        "interior": {
                            "source_url": `${book.properties.contentUrl}`
                        },
                        "pod_package_id": `${podPackage}`
                    },
                    "quantity": book.quantity,
                    "title": `${book.properties.title}`
                }
              )
          }),
          "production_delay": 120,
          "shipping_address": {
              "city": `${req.body.shipping_address.city}`,
              "country_code": `${req.body.shipping_address.country_code}`,
              "name": `${req.body.shipping_address.name}`,
              "phone_number": `${req.body.shipping_address.phone_number}`,
              "postcode": `${req.body.shipping_address.zip}`,
              "state_code": `${req.body.shipping_address.province_code}`,
              "street1": `${req.body.shipping_address.address1}`
          },
          "shipping_level": "MAIL"
      },
        json: true,
        };

    
    if (purchasedBooks) {
        axios
          .post(`${options.url}`, options.body, options.headers)
          .then(reso => {
              console.log('new print order successfully created', reso.data)
          })
          .catch(err => {
              console.log(err)
          })
        } else {
            console.log('no custom book found in order')
        }
  });
  
  function validateWebhook (req, res, next){
    generated_hash = crypto
        .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
        .update(Buffer.from(req.rawbody))
        .digest('base64');
    if (generated_hash == req.headers['x-shopify-hmac-sha256']) {
        next()
    } else {
        res.sendStatus(403)
    }
  }


  async function fetchToken (req, res, next) {
    // Set the configuration settings
    const credentials = {
    client: {
      id: process.env.PRINT_CLIENT_KEY,
      secret: process.env.PRINT_CLIENT_SECRET
    },
    auth: {
      tokenHost: 'https://api.sandbox.lulu.com/auth/realms/glasstree/protocol/openid-connect/token'
    }
  };

  const httpOptions = {
    'grant_type': 'client_credentials',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `${process.env.PRINT_ENCODED_SECRET}`
  }

  let response = await axios.post(`${credentials.auth.tokenHost}`, { httpOptions })
  let token = await response.data

  if (token) {
  res.token = token
  next()
  } else {
      res.sendStatus(403)
  }
}

  module.exports = router;