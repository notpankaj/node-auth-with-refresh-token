const mongoose = require("mongoose");

const disconnected = "disconnected";
const connected = "connected";
const error = "error";

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("mongodb conneted!");
  })
  .catch((err) => {
    console.log(err.messgae);
  });

mongoose.connection.on(connected, () => {
  console.log("mongoose connected to db!");
});

mongoose.connection.on(error, (err) => {
  console.log(err.messgae);
});

mongoose.connection.on(disconnected, () => {
  console.log("mongoose connection is disconnected!");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
