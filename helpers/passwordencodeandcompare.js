const bcrypt = require('bcrypt');
const saltRounds = 10;


const encode = async (password) => {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword;
} 

const compare = async (password, encryptedPassword) => {
   const result = bcrypt.compare(password, encryptedPassword);
   return result;
}
module.exports = {encode, compare};