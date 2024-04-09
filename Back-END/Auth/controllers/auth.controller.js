const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Delivery = require('../models/Delivery');
const Intern = require('../models/Intern');
const Restaurant = require('../models/Restaurant');
const Tiers = require('../models/Tiers');
const pool = require('../controllers/dbMaria');

exports.registerUser = async (req, res) => {
    try {
        //verify if the user already exists
        const queryResult = await pool.query('SELECT * FROM CLIENTS WHERE email = ?', [req.body.email]);
        const userExists = queryResult.length > 0;

        if (userExists) {
            return res.status(400).json({ "error": "email already exists." });
        }
        //hash password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        //create new user
        const newUser = new User({
            email: req.body.email,
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

exports.loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;
      //execute a query to find the user by email
      const result = await pool.query('SELECT * FROM CLIENTS WHERE email = ?', [email]);
      //assuming the query returns an array of results, check if we got any result
      const user = result[0]; 

      if (user && bcrypt.compareSync(password, user.password)) {
          const accessToken = jwt.sign({ email: user.email, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.ACCESS_JWT_KEY);
          res.status(200).json({ message: "user person is now connected!", accessToken: accessToken });
      } else {
          return res.status(401).json({ message: "Invalid email or password" });
      }
  } catch (error) {
      console.error("login error: ", error);
      return res.status(500).json({ "error": "internal server error" });
  }
};

exports.authenticateUser = (req, res) => {
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
      const user = await User.findOne({ email: decoded.email }); 
  
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
      // res.locals.user = user; //store user in res.locals
      return res.status(200).send({ message: "Access granted." });
    });
  };

  //below are the functions for the other types of models
  //they are similar to the user functions
  //the only difference is the model used
  //and the fields used in the model
  
  exports.registerDelivery = async (req, res) => {
    try {
      const queryResult = await pool.query('SELECT * FROM LIVREURS WHERE email = ?', [req.body.email]);
      const DeliveryExists = queryResult.length > 0;

      if (DeliveryExists) {
          return res.status(400).json({ "error": "email already exists." });
      }
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const newDelivery = new Delivery({
            ...req.body,
            password: hashedPassword
        });
        await newDelivery.save();
        return res.status(201).json({ "msg": "New delivery person created!" });
    } catch (error) {
        console.error("register error: ", error);
        return res.status(500).json({ "error": "internal server error" });
    }
};

exports.loginDelivery = async (req, res) => {
  try {
      const { email, password } = req.body;
      //execute a query to find the Delivery by email
      const result = await pool.query('SELECT * FROM LIVREURS WHERE email = ?', [email]);
      //assuming the query returns an array of results, check if we got any result
      const delivery = result[0]; 

      if (delivery && bcrypt.compareSync(password, delivery.password)) {
          const accessToken = jwt.sign({ email: delivery.email, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.ACCESS_JWT_KEY);
          res.status(200).json({ message: "delivery person is now connected!", accessToken: accessToken });
      } else {
          return res.status(401).json({ message: "Invalid email or password" });
      }
  } catch (error) {
      console.error("login error: ", error);
      return res.status(500).json({ "error": "internal server error" });
  }
};

exports.authenticateDelivery = (req, res) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send({ message: "No token given." });
    }
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.ACCESS_JWT_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Not authorised." });
        }
        const delivery = await Delivery.findOne({ email: decoded.email });
        if (!delivery) {
            return res.status(404).send({ message: "Delivery person not found." });
        }
        return res.status(200).send({ message: "Access granted." });
    });
};

exports.registerIntern = async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT * FROM INTERN WHERE email = ?', [req.body.email]);
    const InternExists = queryResult.length > 0;

    if (InternExists) {
        return res.status(400).json({ "error": "email already exists." });
    }
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const newIntern = new Intern({
          ...req.body,
          password: hashedPassword
      });
      await newIntern.save();
      return res.status(201).json({ "msg": "New Intern person created!" });
  } catch (error) {
      console.error("register error: ", error);
      return res.status(500).json({ "error": "internal server error" });
  }
};


exports.loginIntern = async (req, res) => {
  try {
      const { email, password } = req.body;
      const result = await pool.query('SELECT * FROM INTERN WHERE email = ?', [email]);
      const intern = result[0];

      if (intern && bcrypt.compareSync(password, intern.password)) {
          const accessToken = jwt.sign({ email: intern.email, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.ACCESS_JWT_KEY);
          res.status(200).json({ message: "Intern person is now connected!", accessToken: accessToken });
      } else {
          return res.status(401).json({ message: "Invalid email or password" });
      }
  } catch (error) {
      console.error("login error: ", error);
      return res.status(500).json({ "error": "internal server error" });
  }
};

exports.authenticateIntern = (req, res) => {
  let token = req.headers["authorization"];
  if (!token) {
      return res.status(403).send({ message: "No token given." });
  }
  if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
  }
  jwt.verify(token, process.env.ACCESS_JWT_KEY, async (err, decoded) => {
      if (err) {
          return res.status(401).send({ message: "Not authorised." });
      }
      const Intern = await Intern.findOne({ email: decoded.email });
      if (!Intern) {
          return res.status(404).send({ message: "Intern person not found." });
      }
      return res.status(200).send({ message: "Access granted." });
  });
};

exports.registerRestaurant = async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT * FROM RESTAURANT WHERE email = ?', [req.body.email]);
    const RestaurantExists = queryResult.length > 0;

    if (RestaurantExists) {
        return res.status(400).json({ "error": "email already exists." });
    }
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const newRestaurant = new Restaurant({
          ...req.body,
          password: hashedPassword
      });
      await newRestaurant.save();
      return res.status(201).json({ "msg": "New Restaurant person created!" });
  } catch (error) {
      console.error("register error: ", error);
      return res.status(500).json({ "error": "internal server error" });
  }
};

exports.loginRestaurant = async (req, res) => {
  try {
      const { email, password } = req.body;
      const result = await pool.query('SELECT * FROM RESTAURANT WHERE email = ?', [email]);
      const restaurant = result[0]; 

      if (restaurant && bcrypt.compareSync(password, restaurant.password)) {
          const accessToken = jwt.sign({ email: restaurant.email, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.ACCESS_JWT_KEY);
          res.status(200).json({ message: "restaurant person is now connected!", accessToken: accessToken });
      } else {
          return res.status(401).json({ message: "Invalid email or password" });
      }
  } catch (error) {
      console.error("login error: ", error);
      return res.status(500).json({ "error": "internal server error" });
  }
};


exports.authenticateRestaurant = (req, res) => {
  let token = req.headers["authorization"];
  if (!token) {
      return res.status(403).send({ message: "No token given." });
  }
  if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
  }
  jwt.verify(token, process.env.ACCESS_JWT_KEY, async (err, decoded) => {
      if (err) {
          return res.status(401).send({ message: "Not authorised." });
      }
      const Restaurant = await Restaurant.findOne({ email: decoded.email });
      if (!Restaurant) {
          return res.status(404).send({ message: "Restaurant person not found." });
      }
      return res.status(200).send({ message: "Access granted." });
  });
};

exports.registerTiers = async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT * FROM DEV_TIERS WHERE email = ?', [req.body.email]);
    const TiersExists = queryResult.length > 0;

    if (TiersExists) {
        return res.status(400).json({ "error": "email already exists." });
    }
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const newTiers = new Tiers({
          ...req.body,
          password: hashedPassword
      });
      await newTiers.save();
      return res.status(201).json({ "msg": "New Tiers person created!" });
  } catch (error) {
      console.error("register error: ", error);
      return res.status(500).json({ "error": "internal server error" });
  }
};

exports.loginTiers = async (req, res) => {
  try {
      const { email, password } = req.body;
      const result = await pool.query('SELECT * FROM DEV_TIERS WHERE email = ?', [email]);
      const tiers = result[0]; 

      if (tiers && bcrypt.compareSync(password, tiers.password)) {
          const accessToken = jwt.sign({ email: tiers.email, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.ACCESS_JWT_KEY);
          res.status(200).json({ message: "tiers person is now connected!", accessToken: accessToken });
      } else {
          return res.status(401).json({ message: "Invalid email or password" });
      }
  } catch (error) {
      console.error("login error: ", error);
      return res.status(500).json({ "error": "internal server error" });
  }
};

exports.authenticateTiers = (req, res) => {
  let token = req.headers["authorization"];
  if (!token) {
      return res.status(403).send({ message: "No token given." });
  }
  if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
  }
  jwt.verify(token, process.env.ACCESS_JWT_KEY, async (err, decoded) => {
      if (err) {
          return res.status(401).send({ message: "Not authorised." });
      }
      const Tiers = await Tiers.findOne({ email: decoded.email });
      if (!Tiers) {
          return res.status(404).send({ message: "Tiers person not found." });
      }
      return res.status(200).send({ message: "Access granted." });
  });
};



