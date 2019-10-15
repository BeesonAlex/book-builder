const { Router } = require('express');
const router = Router();
const path = require('path');

// Shopify OAuth
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_SECRET_KEY;
const scopes = process.env.SHOPIFY_SCOPES;
const forwardingAddress = process.env.FORWARDING_ADDRESS;
//

// Shopify Routes

router.get('/', (req, res) => {
    const shop = req.query.shop;
    if (shop) {
      const state = nonce();
      const redirectUri = forwardingAddress + '/shopify/callback';
      const installUrl = 'https://' + shop +
        '/admin/oauth/authorize?client_id=' + apiKey +
        '&scope=' + scopes +
        '&state=' + state +
        '&redirect_uri=' + redirectUri;
  
      res.cookie('state', state);
      res.redirect(installUrl);
    } else {
      return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
    }
  });


  router.get('/callback', (req, res) => {
    const { shop, hmac, code, state } = req.query;
    const stateCookie = cookie.parse(req.headers.cookie).state;
  
    if (state !== stateCookie) {
      return res.status(403).send('Request origin cannot be verified');
    }
  
    if (shop && hmac && code) {
        // Validate request is from Shopify
        const map = Object.assign({}, req.query);
        delete map['signature'];
        delete map['hmac'];
        const message = querystring.stringify(map);
        const providedHmac = Buffer.from(hmac, 'utf-8');
        const generatedHash = Buffer.from(
          crypto
            .createHmac('sha256', apiSecret)
            .update(message)
            .digest('hex'),
            'utf-8'
          );
        let hashEquals = false;
        // timingSafeEqual will prevent any timing attacks. Arguments must be buffers
        try {
          hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
        // timingSafeEqual will return an error if the input buffers are not the same length.
        } catch (e) {
          hashEquals = false;
        };

        if (!hashEquals) {
          return res.status(400).send('HMAC validation failed');
        }

        // Exchange temporary code for a permanent access token
        const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
        const accessTokenPayload = {
          client_id: apiKey,
          client_secret: apiSecret,
          code,
        };

        request.post(accessTokenRequestUrl, { json: accessTokenPayload })
        .then((accessTokenResponse) => {
          const accessToken = accessTokenResponse.access_token;

        // Use access token to make API call to 'shop' endpoint
        
        const shopRequestUrl = 'https://' + shop + '/admin/api/2019-10/shop.json';
        const shopRequestHeaders = {
          'X-Shopify-Access-Token': accessToken,
        };

        request.get(shopRequestUrl, { headers: shopRequestHeaders })
        .then((shopResponse) => {
          res.status(200).end(shopResponse);
        })
        .catch((error) => {
          res.status(error.statusCode).send(error.error.error_description);
        });
    })
    .catch((error) => {
      res.status(error.statusCode).send(error.error.error_description);
    });

    } else {
      res.status(400).send('Required parameters missing');
    }
  });


  router.get('/proxy', (req, res) => {
    res.set('Content-Type', 'application/liquid').sendFile(path.join(__dirname, '/client/build/index.html'));
  });



  module.exports = router;