const express = require('express');
const router = express.Router();

const { handleGenerateNewShortUrl, getAllUrls, handleRedirectRequest} = require('../controllers/url');

router.post('/post', handleGenerateNewShortUrl);

router.get('/', getAllUrls);

router.get('/:shortId', handleRedirectRequest);

module.exports = router;