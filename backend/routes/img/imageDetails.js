const express = require("express");
const cors = require("cors");
const db = require("../../db/db");
const router = express.Router();
const multer = require("multer");

router.use(cors());
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

router.post("/imgdetails", upload.single("img"), (req, res, next) => {
  if (!req.body) res.json({ msg: "error" });
  else {
    const img = req.file.buffer;
    db.query(
      "insert into imagedata(title,imgdata) values(?,?)",
      [req.body.title, img],
      (error, results) => {
        console.log(error);
        if (error) res.json({ msg: "error" });
        else res.json({ msg: "okay" });
      }
    );
  }
});

module.exports = router;
