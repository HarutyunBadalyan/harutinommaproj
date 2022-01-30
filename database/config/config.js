
const path = require("path");
require("dotenv").config()  
if(!process.env.DB_USERNAME) {
  require("dotenv").config({path: path.join(__dirname,"../","../",".env")})
}
console.log(process.env.DB_USERNAME,  process.env.DB_HOST)
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:  process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },
}
