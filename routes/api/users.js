const express = require('express');
const router = express.Router();

// route get api/post/test
// desc test users route
// access Private
router.get('/test', (req, res) => res.json({
    msg: "Users Works"
}));

module.exports = router;