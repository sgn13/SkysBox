const express = require('express') 
const router = express.Router();
const User = require('../../models/User')

router.get('/',  (req,res)=>{
    User.find()
    
    //.sort({ date:-1})
    .then(User => res.json(User))
    console.log(User)

});

module.exports = router;