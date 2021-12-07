const mongoose = require("mongoose");
require("dotenv").config();

const { DB_KIND, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_COLLECTION } =
  process.env;
const dbUrl = `${DB_KIND}://${DB_HOST}:${DB_PORT}/${DB_COLLECTION}`;

const connect = () =>
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to db"))
    .catch((e) => console.error(e));
module.exports = connect;
