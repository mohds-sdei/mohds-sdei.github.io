var express = require('express');
var router = express.Router();
var passport = require('../../config/auth');


// Load the bcrypt module
var bcrypt = require('bcryptjs');



// importing indexController
var story = require('../controller/indexController.js');
var userController = require('../controller/usersController.js');
var adminController = require('../controller/adminsController.js');
var productController = require('../controller/productController.js');
