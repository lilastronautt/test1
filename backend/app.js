const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const imgDetails = require("./routes/img/imageDetails");
const getImageDetails = require("./routes/img/getImageDetails");

const corsOption = {
  origin: ["http://localhost:5173"],
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/img", imgDetails);
app.use("/img", getImageDetails);

app.get("/", (req, res, next) => {
  res.json({ msg: "okay" });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
