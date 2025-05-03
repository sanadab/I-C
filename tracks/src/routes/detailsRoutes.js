const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const Details = require('../models/Details');

router.get('/details/all-counselors', requireAuth, async(req, res) => {
    try {
        console.log('📥 GET /details/all-counselors called');
        const counselors = await Details.find(); // Fetch all counselors
        res.send(counselors);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;