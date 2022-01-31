const path = require("path");
require('dotenv').config({path: path.join(__dirname, ".env") });

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const BaseUrl = process.env.BASEURL || "http://localhost:5000/";
module.exports = {EMAIL,PASSWORD, BaseUrl}