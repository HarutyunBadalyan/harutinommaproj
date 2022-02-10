const url = require("url");

const express = require("express");
const signUpRoute = express.Router();


const { body, validationResult } = require('express-validator');
const signupBodyValidation = require("../middlewares/signupvalidationmiddleware")
const {encode} = require("../helpers/passwordencodeandcompare");
const {encodeToken} = require("../helpers/encodedecodetoken");
const { User} = require("../database/models/index");
const sendEmail = require("../helpers/sendemail");
const Config = require("../devconfig");
signUpRoute.get("/register", (req, res, next) => {
    if(req.session.userId) {
        return res.send({msg: "profile" });
    }
    next();
});

signUpRoute.post("/register",   
    signupBodyValidation,
   async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.send(errors.array())
    }
        const hashPassword = await encode(req.body.password);
        try {
            const user = await User.create({
                firstName: req.body.firstName, 
                lastName: req.body.lastName,
                password:  hashPassword,
                email: req.body.email
            });
            const token = encodeToken(req.body.email);
            const authenticationUrl = url.resolve(Config.BaseUrl,`token/${token}`);
            sendEmail(req.body.email, "Authentication message", "", `<a href="${authenticationUrl}"> Click here </a>`);
            res.send({msg:"Go and check Your email"});
        } catch(err) {
           if (err.name == "SequelizeUniqueConstraintError") {
               return res.send({msg: "this Email already used"});
           }
            res.send({msg: err});
        }
  });

module.exports = signUpRoute;