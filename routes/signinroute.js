const express = require("express");
const signinRoute = express.Router();
const {compare} = require("../helpers/passwordencodeandcompare")
const { body, validationResult } = require('express-validator');
const siginBodyValidation = require("../middlewares/siginbodyvalidationmiddleware");
const {User} = require("../database/models/index");

signinRoute.get("/", (req, res) => {
    if(req.session.userId) {
        res.send({msg: "profile" })
    }
});
signinRoute.post("/login", 
    siginBodyValidation,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
            throw "Invalid password or email";
            }
            const user = await User.findOne({raw: true, where:{email: req.body.email}});
            if(!user) {
                throw "Invalid password or email";
            }
            const result = await compare(req.body.password, user.password);
            if(!result) {
                throw "Invalid password or email";
            }
            if(!user.authenticated) {
                throw "Authentication required Please check your email for authentication";
            }
            req.session.userId = user.id;
            res.send({msg: "success" });
            

        } catch(err) {
            console.log(err);
            res.send({msg: err});
        }


    }





);


module.exports = signinRoute;