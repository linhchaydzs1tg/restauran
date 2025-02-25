// filepath: /d:/nhahangjapan/src/Router/index.js
const express = require('express');
const homeController = require('../App/Controllers/homeController');
const router = express.Router();

router.get('/', homeController.index);
module.exports = router;