const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
require("./helpers/initMongodb");
const AuthRoutes = require("./routes/Auth.route");
const { verifyAccessToken } = require("./helpers/jwtHelper");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

app.get("/", verifyAccessToken, async (req, res) => {
  console.log(req.headers["authorization"]);
  res.send("Hello From Node");
});

app.use("/auth", AuthRoutes);

app.use(async (req, res, next) => {
  //   const error = new Error("Not Found!");
  //   error.status = 404;
  //   next(error);
  next(createError.NotFound("This route does not exist!"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
