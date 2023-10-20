const express = require("express");
const cors = require("cors");
const db = require("../../db/db");
const router = express.Router();

router.use(cors());

router.get("/getimgdetails", (req, res, next) => {
  if (!req.body) res.json({ msg: "error" });
  else {
    db.query("select * from imagedata", [], (error, results) => {
      if (error) res.json({ msg: "error" });
      else res.json(results);
    });
  }
});

module.exports = router;
