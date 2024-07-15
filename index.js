require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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
