const express = require('express');
const Admin = require('./Admin'); 
const User = require('./User');   
const router = express.Router();

router.use('/admin', Admin);
router.use('/user', User);

module.exports = router;
