const express = require('express');
const router = express.Router();

const authrizedRoles = require('../middlewares/roleMiddleware');

const   verifyToken  = require('../middlewares/authMiddleware');


// only admin can access the routes
router.get('/admin', verifyToken,authrizedRoles("admin"), (req, res) => {
    res.send('Welcome Admin')
})

// only admin and manager can aceess the routes
router.get('/manager',verifyToken,authrizedRoles("admin","manager"), (req, res) => {
    res.send('Welcome Manager')
})

// All  can aceess the routes
router.get('/user',verifyToken, authrizedRoles("user","admin","manager") ,(req, res) => {
    res.send('Welcome User')
})


module.exports = router;
