const { body } = require('express-validator');

const siginBodyValidation = [
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
]
module.exports = siginBodyValidation;