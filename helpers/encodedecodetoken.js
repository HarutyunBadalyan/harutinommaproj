/**
 * @param  {number} time represent expired time in seconds default is one hour
 */
const jwt = require('jsonwebtoken');
const privateKey =   "secret"
const encodeToken = (data, time) => {
    const token = jwt.sign({ data:data }, "secret", {  expiresIn: time || 3600});
    return token;
}
const decodeToken = (token) => {
    const decoded = jwt.verify(token, "secret");
    return decoded;
}
module.exports = {decodeToken, encodeToken};