const express = require("express");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieparser());
app.use(routes);

mongoose
  .connect(process.env.DBURL)
  .then((result) =>
    app.listen(process.env.PORT, () => {
      console.log(process.env.PORT);
    })
  )
  .catch((err) => console.log("Database cann't connect " + err));
