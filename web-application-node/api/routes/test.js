const express = require('express');
let router= express.Router();

router.get('/',function(req,res,next){
    res.send('Abidarsh myran')
});

module.exports = router;


