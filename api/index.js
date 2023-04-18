const express = require("express");
const app = express();
const port = 4000;
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("index page");
});

app.listen(port, () => console.log(`server berjalan di port ${port}`));
