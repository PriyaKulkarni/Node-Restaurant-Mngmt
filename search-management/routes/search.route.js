const express = require("express");
const logger = require("../config/winston");
const router = express.Router();
const searchCtrl = require('../controllers/search.controller');

module.exports = (app) => {
    router.get('/search', searchCtrl.validate('search'), searchCtrl.search);

    app.use('/api', router);
}