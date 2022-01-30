//require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const cors = require('cors')
const signUpRoute = require("./routes/signuproute");

const {decodeToken} = require("./helpers/encodedecodetoken")

const {User} = require("./database/models/index");
const signinRoute = require("./routes/signinroute");
const profileRoute = require("./routes/profileroute");
console.log(process.env.SESSION_SECRET)
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"build")))
app.get("/token/:id", async (req, res) => {
 try {
     decodedData = decodeToken(req.params.id);
     console.log(decodedData);
     const user = await User.update({ authenticated: true }, {
        where: {
          email:decodedData.data,
        }
      });
     res.send("success");
 } catch(err) {
     console.log(err);
     res.send("time expired");
 }
})
app.use("/api", signUpRoute);
app.use("/api", signinRoute);
app.use("/api", profileRoute);
app.post("/logout", (req, res) => {
    
    req.session.destroy();
    res.send({msg: "success"});
})
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"build","index.html"))
})
app.listen(PORT, () => console.log(`server listen localhost: ${PORT}`));