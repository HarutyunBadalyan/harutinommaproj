const express = require("express");
const profileRoute = express();

const {User} = require("../database/models/index");
profileRoute.get("/profile", async (req, res) => {
    if(!req.session.userId) {
        return res.send({msg: "/" });
    }
    const user = await User.findOne({raw: true, where:{ id: req.session.userId}}).catch(e =>  res.send("something went wrong"));
    const {id, password, ...rest} = user;
    res.send(rest);

})
module.exports = profileRoute;