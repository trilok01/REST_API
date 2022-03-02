const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const user = require('../src/models/user');

const jwt = require('jsonwebtoken');

const secret = {"secret": "supersecret"};