const express = require('express');

const router = express.Router();

router.get('/', require('./controllers/rootController'));

module.exports = router;