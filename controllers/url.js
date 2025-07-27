const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
  
    if(!body.url) return res.status(400).json({error: "URL is required"});

    const shortId = shortid();
    console.log(`Generated short ID: ${shortId} for URL: ${body.url}`);
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    });
    return res.render("allUrls", { urls: { id: shortId,} });
    // return res.status(201).json({shortId: shortId});
}

async function getAllUrls(req, res) {
    const urls = await URL.find({});
    return res.status(200).render("allUrls", { urls: urls });
}

async function handleRedirectRequest(req, res) {
    const { shortId } = req.params;
    console.log(`Redirecting for short ID: ${shortId}`);
    const urlEntry = await URL.findOneAndUpdate({ shortId: shortId },{$push: { visitHistory: { timestamp: new Date() } } });
    if (!urlEntry) {
        return res.status(404).json({ error: "URL not found" });
    }

    // Update visit history
    urlEntry.visitHistory.push({ timestamp: new Date() });  
    await urlEntry.save();

    return res.redirect(urlEntry.redirectUrl);
}

module.exports = {
    handleGenerateNewShortUrl,
    getAllUrls,
    handleRedirectRequest
};