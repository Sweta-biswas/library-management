const express = require('express');
const Admin = require('./Admin'); 
const User = require('./User'); 
const Transaction = require('./Transaction');  
const router = express.Router();

router.use('/admin', Admin);
router.use('/user', User);
router.use('/transaction', Transaction);

module.exports = router;
