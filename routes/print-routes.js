const { Router } = require('express');
const router = Router();
const axios = require('axios');
const crypto = require('crypto');

// function verifyHmac(data, hmac) {
//     if (!hmac) {
//       return false;
//     } else if (!data || typeof data !== 'object') {
//       return false;
//     }

//     const sharedSecret = process.env.SHOPIFY_WEBHOOK_SECRET;
//     const calculatedSignature = crypto.createHmac('sha256', sharedSecret).update(data).digest('hex');
//     console.log('calculatedSignature', calculatedSignature)
//     console.log('hmac', hmac)
//     return calculatedSignature === hmac;
// }

let token = '';
let order = {};
// Register Webhook to listen for new orders with custom books
router.post('/webhook/order', validateWebhook, fetchToken, async (req, res) => {
    console.log('beginning to send print package')
    console.log(token)
    console.log(order.line_items[0].properties)
    const podPackage = '0850X1100FCPRECW080CW444MXX';
    let purchasedBooks = order.line_items.filter(data => data.variant_id == '31160253481057');

    var options = {
        method: 'POST',
        url: 'https://api.lulu.com/print-jobs/',
        headers: {
          'Authorization': `Bearer ${token.access_token}`,
          'Content-Type': 'application/json'
        },
        body: {
          "contact_email": `beeson.alexander@gmail.com`,
          "external_id": `${order.order_number}`,
          "line_items": purchasedBooks.map(book => {
              return (
                {
                    "external_id": `${book.id}`,
                    "printable_normalization": {
                        "cover": {
                            "source_url": `${book.properties[2].value}`
                        },
                        "interior": {
                            "source_url": `${book.properties[1].value}`
                        },
                        "pod_package_id": `${podPackage}`
                    },
                    "quantity": book.quantity,
                    "title": `${book.properties[0].value}`
                }
              )
          }),
          "production_delay": 120,
          "shipping_address": {
              "city": `${order.shipping_address.city}`,
              "country_code": `${order.shipping_address.country_code}`,
              "name": `${order.shipping_address.name}`,
              "phone_number": `${order.shipping_address.phone_number || '2892515533'}`,
              "postcode": `${order.shipping_address.zip}`,
              "state_code": `${order.shipping_address.province_code}`,
              "street1": `${order.shipping_address.address1}`
          },
          "shipping_level": "GROUND"
      },
        json: true,
        };

    
    if (purchasedBooks) {
        axios
          .post(`${options.url}`, options.body, { headers: options.headers })
          .then(reso => {
              console.log('new print order successfully created')
          })
          .catch(err => {
              console.log(err)
          })
        } else {
            console.log('no custom book found in order')
        }
  });
  
  function validateWebhook (req,res,next) {
    res.sendStatus(200)
    hmac = req.get('X-Shopify-Hmac-SHA256');
    data = req.body;
    const sharedSecret = process.env.SHOPIFY_WEBHOOK_SECRET;
    const calculatedSignature = crypto.createHmac('sha256', sharedSecret).update(data, 'utf8', 'hex').digest('base64');

    if (!hmac && !data) {
    console.log(`Webhook request failed from: ${req.get('X-Shopify-Shop-Domain')}`);
    return
    }

    else if (calculatedSignature === hmac) {
        req.topic = req.get('X-Shopify-Topic');
        req.shop = req.get('X-Shopify-Shop-Domain');
        order = JSON.parse(data.toString())
        console.log('successfully validated hmac')
        return next();
    } else {

  console.log('Webhook request could not be verified')
  return
    }
}


  async function fetchToken (req, res, next) {
    // Set the configuration settings
    console.log('fetching token')
    const credentials = {
    client: {
      id: process.env.PRINT_CLIENT_KEY,
      secret: process.env.PRINT_CLIENT_SECRET
    },
    auth: {
      tokenHost: 'https://api.lulu.com/auth/realms/glasstree/protocol/openid-connect/token'
    }
  };

  const httpOptions = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `${process.env.PRINT_ENCODED_SECRET}`
  }

axios
    .post(`${credentials.auth.tokenHost}`,'grant_type=client_credentials', { headers: httpOptions })
    .then(resp => {
        token = resp.data
        if (token) {
            console.log('successfully fetched token')
          
          return next()
          } else {
              console.log('could not fetch token')
              return
          }
    })
    .catch(err => {
        console.log(err)
    })


}

  module.exports = router;




//   function validateWebhook (req, res, next){
//     generated_hash = crypto
//         .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
//         .update(Buffer.from(req.rawbody))
//         .digest('base64');
//     if (generated_hash == req.headers['x-shopify-hmac-sha256']) {
//         console.log('successfully validated webhook')
//         next()
//     } else {
//         res.sendStatus(403)
//     }
//   }

// async function validateWebhook (req, res, next){
//     console.log('Webhook Received')
//         // We'll compare the hmac to our own hash
//       const hmac = req.get('X-Shopify-Hmac-Sha256')
    
//       // Use raw-body to get the body (buffer)
    
//       const body = await getRawBody(req)
    
//       // Create a hash using the body and our key
//       const hash = crypto
//         .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
//         .update(body, 'utf8', 'hex')
//         .digest('base64')
    
//       // Compare our hash to Shopify's hash
//       if (hash === hmac) {
//         // It's a match! All good
//         res.sendStatus(403)
//         console.log('Phew, it came from Shopify!')
//         res.order = JSON.parse(body.toString())
//         console.log(res.order)
//         next()
//       } else {
//         // No match! This request didn't originate from Shopify
//         console.log('Danger! Not from Shopify!')
//         res.sendStatus(403)
//       }
//       }