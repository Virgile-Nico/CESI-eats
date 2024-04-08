const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        //verify if the user already exists
        const userExists = await User.findOne({ username: req.body.username });
        if (userExists) {
            return res.status(400).json({ "error": "Username already exists." });
        }
        //hash password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        //create new user
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        });
        //save new user
        await newUser.save();
        //return success message
        return res.status(201).json({ "msg": "New user created !" });
    } catch (error) {
        console.error("register error: ", error);
        return res.status(500).json({ "error": "internal server error" });
    }
};



exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (user && bcrypt.compareSync(password, user.password)) {
            const accessToken = jwt.sign({ username: user.username, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.ACCESS_JWT_KEY);
            res.status(200).json({ message: "You are now connected !", accessToken: accessToken });
        } else {
            return res.status(401).json({ message: "invalid username or password" });
        }
    } catch (error) {
        console.error("login error: ", error);
        return res.status(500).json({ "error": "internal server error" });
    }
};

exports.authenticate = (req, res) => {
    let token = req.headers["authorization"];


    //if token exists
    if (!token) {
      return res.status(403).send({ message: "no token given." });
    }
  
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }

    //verify token
    jwt.verify(token, process.env.ACCESS_JWT_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Not autorised." });
      }
  
      //check if user exists
      const user = await User.findOne({ username: decoded.username }); 
  
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
  
    
      // res.locals.user = user; //store user in res.locals
      return res.status(200).send({ message: "Access granted." });
    });
  };
const User = require("../models/user.model");
const User_DB = [];