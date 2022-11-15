const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./Config/connection");
const response = require("./response");
const mahasiswaRoute = require("./Routes/mahasiswa.routes");
const authRoute = require("./Routes/auth.routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/mahasiswa", mahasiswaRoute);
app.use("/api/v1/auth", authRoute);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
