const { body, validationResult } = require('express-validator');

const signupBodyValidation =[
    body('email').isEmail().withMessage("Email is required"),
    body('password').isLength({ min: 8 }).withMessage("Password must contain 8 character"),
    body("firstName").not().isEmpty().withMessage("firstname is required"),
    body("lastName").not().isEmpty().withMessage("lastname is required"),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      })]
      

module.exports = signupBodyValidation;