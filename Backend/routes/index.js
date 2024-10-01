const express = require('express');
const Admin = require('./Admin'); 
const User = require('./User'); 
const Transaction = require('./Transaction');  
const Reports= require('./Report');
const router = express.Router();

router.use('/admin', Admin);
router.use('/user', User);
router.use('/transaction', Transaction);
router.use('/report', Reports);
module.exports = router;
