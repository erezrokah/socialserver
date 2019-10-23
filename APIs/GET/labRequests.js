const express = require('express');
const router = express.Router();

const labQueries = require('../../queries/labQueries')

const redirectRoutes = require('../loginRedirect')

module.exports = router