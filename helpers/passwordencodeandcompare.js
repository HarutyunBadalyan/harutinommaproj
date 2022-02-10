const bcrypt = require('bcrypt');
const saltRounds = 10;

class PasswordEncodeDecode {
    static async encode   (password)  {
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        return encryptedPassword;
    } 

    static async compare  (password, encryptedPassword)  {
    const result = bcrypt.compare(password, encryptedPassword);
    return result;
    }
}
module.exports = {PasswordEncodeDecode};