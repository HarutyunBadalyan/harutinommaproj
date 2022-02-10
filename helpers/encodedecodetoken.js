/**
 * @param  {number} time represent expired time in seconds default is one hour
 */
const jwt = require('jsonwebtoken');
const privateKey =   "secret";
class TokenEncodeDecode {
    static encodeToken  (data, time)  {
        const token = jwt.sign({ data:data }, privateKey, {  expiresIn: time || 3600});
        return token;
    }
    static decodeToken  (token) {
        const decoded = jwt.verify(token, privateKey);
        return decoded;
    }
}
module.exports = {TokenEncodeDecode };