require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "https://sprightly-speculoos-089ad5.netlify.app/#/login",
    credentials: true, // Allow credentials
  })
);
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://sprightly-speculoos-089ad5.netlify.app/#/login"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
const mongoose = require("mongoose");
const { router } = require("./routes/user/user");
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then((res) => console.log("connected"));
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("database connected"));
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log("running");
});
app.use("/user", router);
