const express = require('express') 
const router = express.Router();
const multer  = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads');
    },
    
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
const upload = multer({storage: storage});

router.post('/',upload.single('image'),function(req, res, next) {
    console.log(req.file);
    if(!req.file) {
      res.status(500);
      return next(err);
    }
    res.json({ fileUrl: 'http://localhost:5000/public/uploads/' + req.file.filename });
  })

  router.get('/',(req,res)=>{
    //finds directory and stores
    const uploadsDirectory = path.join('./public/uploads') ;

    //reads file in directory
    fs.readdir(uploadsDirectory,(err,files)=>{
      if (err){
        return res.json({msg:err})
      }
      //if there are no files in directory return
      if (files.length === 0){
        return res.json({msg:"No images uploaded"});
      }
      
      //return array of all filenames in upload directory
      return res.json({files})
    })
  

  })


module.exports = router;






































































