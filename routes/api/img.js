const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./public/uploads/`);
  },

  filename: (req, file, cb, id) => {
    const date = Date.now;
    console.log(file);
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, `${req.params.id}` + "-" + Date.now() + "." + filetype);
  },
});
const upload = multer({ storage: storage });

// router.post('/',upload.single('image'),function(req, res, next) {
//     console.log(req.file);
//     if(!req.file) {
//       res.status(500);
//       return next(err);
//     }
//     res.json({
//       id:req.file.filename,
//       fileUrl: 'http://localhost:5000/public/uploads/' + req.file.filename  });
//   })

router.post("/abc/:id", upload.single("image"), function (req, res, next) {
  console.log(req.file);
  if (!req.file) {
    res.status(500);
    return next(err);
  }
  res.json({
    id: req.params.filename,
    fileUrl: `http://localhost:5000/public/uploads/${req.params.id}`,
  });
});

router.get("/", (req, res) => {
  //finds directory and stores
  const uploadsDirectory = path.join("./public/uploads");

  //reads file in directory
  fs.readdir(uploadsDirectory, (err, files, id) => {
    if (err) {
      return res.json({ msg: err });
    }
    //if there are no files in directory return
    if (files.length === 0) {
      return res.json({ msg: "No images uploaded" });
    }

    //return array of all filenames in upload directory

    return res.json({
      files,
    });
  });
});
router.get("/:id", (req, res) => {
  //finds directory and stores
  const uploadsDirectory = path.join("./public/uploads");

  //reads file in directory
  fs.readdir(uploadsDirectory, (err, files, id) => {
    if (err) {
      return res.json({ msg: err });
    }
    //if there are no files in directory return
    if (files.length === 0) {
      return res.json({ msg: "No images uploaded" });
    }
    console.log(`${req.params.id}`, "ok");
    const f = files.filter((str) => str.includes(`${req.params.id}`));

    return res.json({ f });
  });
});

router.delete("/:filename", (req, res) => {
  if (!req.params.filename) {
    console.log("No file received");
    message = "Error! in image delete.";
    return res.status(500).json("error in delete");
  } else {
    console.log("file received");
    console.log(req.params.filename);
    try {
      fs.unlinkSync("./public/uploads/" + req.params.filename);
      console.log("successfully deleted");
      return res.status(200).send("Successfully! Image has been Deleted");
    } catch (err) {
      // handle the error
      return res.status(400).send(err);
    }
  }
});

module.exports = router;
