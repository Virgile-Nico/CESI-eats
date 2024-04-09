const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Delivery = require('../models/Delivery');
const Intern = require('../models/Intern');
const Restaurant = require('../models/Restaurant');
const Tiers = require('../models/Tiers');
const pool = require('../controllers/dbMaria');

module.exports = {
    registerUser: async (body) => {
        try {
            const queryResult = await pool.query('SELECT * FROM CLIENTS WHERE MAIL = ?', [body.MAIL]);
            const userExists = queryResult.length > 0;
    
            if (userExists) {
                return res.status(400).json({ "error": "email already exists." });
            }
            const hashedPassword = bcrypt.hashSync(body.PASSWORD, 10);
            await pool.query('INSERT INTO CLIENTS (MAIL, PASSWORD, NOM, PRENOM, TEL, CODE_PARRAIN, CODE_PARAINAGE) VALUES (?, ?, ?, ?, ?, ?, ?)', [body.MAIL, hashedPassword, body.NOM, body.PRENOM, body.TEL, body.CODE_PARRAIN, body.CODE_PARAINAGE]);
        } catch (error) {
            console.error("register error: ", error);
        }
    
    }
}

exports.loginUser = async (req, res) => {
  try {
      const { MAIL, password } = req.body;
      //execute a query to find the user by email
      const result = await pool.query('SELECT * FROM CLIENTS WHERE MAIL = ?', [MAIL]);
      //assuming the query returns an array of results, check if we got any result
      const user = result[0]; 

      if (user && bcrypt.compareSync(password, user.password)) {
          const accessToken = jwt.sign({ MAIL: user.MAIL, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.ACCESS_JWT_KEY);
          res.status(200).json({ message: "User is now connected!", accessToken: accessToken });
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
      const user = await User.findOne({ MAIL: decoded.MAIL }); 
  
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
  


module.exports = {
registerDelivery: async (body) => {
    try {
        const queryResult = await pool.query('SELECT * FROM LIVREURS WHERE MAIL = ?', [body.MAIL]);
        const DeliveryExists = queryResult.length > 0;

        if (DeliveryExists) {
            return res.status(400).json({ "error": "email already exists." });
        }
        const hashedPassword = bcrypt.hashSync(body.PASSWORD, 10);
        const hashedRIB = bcrypt.hashSync(body.RIB, 10);
        await pool.query('INSERT INTO LIVREURS (MAIL, PASSWORD, NOM, PRENOM, RIB, VEHICULE_TYPE) VALUES (?, ?, ?, ?, ?, ?)', [body.MAIL, hashedPassword, body.NOM, body.PRENOM, body.TEL, hashedRIB, body.VEHICULE_TYPE]);
    } catch (error) {
        console.error("register error: ", error);
    }

}
}

exports.loginDelivery = async (req, res) => {
  try {
      const { MAIL, password } = req.body;
      const result = await pool.query('SELECT * FROM LIVREURS WHERE MAIL = ?', [MAIL]);
      const delivery = result[0]; 

      if (delivery && bcrypt.compareSync(password, delivery.password)) {
          const accessToken = jwt.sign({ MAIL: delivery.MAIL, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.ACCESS_JWT_KEY);
          res.status(200).json({ message: "Delivery person is now connected!", accessToken: accessToken });
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
        const delivery = await Delivery.findOne({ MAIL: decoded.MAIL });
        if (!delivery) {
            return res.status(404).send({ message: "Delivery person not found." });
        }
        return res.status(200).send({ message: "Access granted." });
    });
};

module.exports = {
registerIntern : async (body) => {
    try {
        const queryResult = await pool.query('SELECT * FROM INTERN WHERE MAIL = ?', [body.MAIL]);
        const InternExists = queryResult.length > 0;

        if (InternExists) {
            return res.status(400).json({ "error": "email already exists." });
        }
        const hashedPassword = bcrypt.hashSync(body.PASSWORD, 10);
        await pool.query('INSERT INTO INTERN (MAIL, PASSWORD, NOM, PRENOM, TYPE) VALUES (?, ?, ?, ?, ?)', [body.MAIL, hashedPassword, body.NOM, body.PRENOM, body.TYPE]);
    } catch (error) {
        console.error("register error: ", error);
    }

}
}

exports.loginIntern = async (req, res) => {
  try {
      const { MAIL, password } = req.body;
      const result = await pool.query('SELECT * FROM INTERN WHERE MAIL = ?', [MAIL]);
      const intern = result[0];

      if (intern && bcrypt.compareSync(password, intern.password)) {
          const accessToken = jwt.sign({ MAIL: intern.MAIL, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.ACCESS_JWT_KEY);
          res.status(200).json({ message: "User is now connected!", accessToken: accessToken });
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
      const Intern = await Intern.findOne({ MAIL: decoded.MAIL });
      if (!Intern) {
          return res.status(404).send({ message: "User not found." });
      }
      return res.status(200).send({ message: "Access granted." });
  });
};


module.exports = {
registerRestaurant: async (body) => {
    try {
        const queryResult = await pool.query('SELECT * FROM RESTAURANT WHERE MAIL = ?', [body.MAIL]);
        const RestaurantExists = queryResult.length > 0;

        if (RestaurantExists) {
            return res.status(400).json({ "error": "email already exists." });
        }
        const hashedPassword = bcrypt.hashSync(body.PASSWORD, 10);
        const hashedRIB = bcrypt.hashSync(body.RIB, 10);
        await pool.query('INSERT INTO RESTAURANT (MAIL, PASSWORD, NOM, TEL, CP, VILLE, ADRESSE, SIRET, RIB) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [body.MAIL, hashedPassword, body.NOM, body.TEL, body.CP, body.VILLE, body.ADRESSE, body.SIRET, hashedRIB]);
    } catch (error) {
        console.error("register error: ", error);
    }

}
}

exports.loginRestaurant = async (req, res) => {
  try {
      const { MAIL, password } = req.body;
      const result = await pool.query('SELECT * FROM RESTAURANT WHERE MAIL = ?', [MAIL]);
      const restaurant = result[0]; 

      if (restaurant && bcrypt.compareSync(password, restaurant.password)) {
          const accessToken = jwt.sign({ MAIL: restaurant.MAIL, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.ACCESS_JWT_KEY);
          res.status(200).json({ message: "User is now connected!", accessToken: accessToken });
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
      const Restaurant = await Restaurant.findOne({ MAIL: decoded.MAIL });
      if (!Restaurant) {
          return res.status(404).send({ message: "Restaurant account not found." });
      }
      return res.status(200).send({ message: "Access granted." });
  });
};


module.exports = {
registerTiers: async (body) => {
    try {
        const queryResult = await pool.query('SELECT * FROM DEV_TIERS WHERE MAIL = ?', [body.MAIL]);
        const TiersExists = queryResult.length > 0;

        if (TiersExists) {
            return res.status(400).json({ "error": "email already exists." });
        }
        const hashedPassword = bcrypt.hashSync(body.PASSWORD, 10);
        await pool.query('INSERT INTO DEV_TIERS (MAIL, PASSWORD, NOM, PRENOM, ENTREPRISE) VALUES (?, ?, ?, ?, ?)', [body.MAIL, hashedPassword, body.NOM, body.PRENOM, body.ENTREPRISE]);
    } catch (error) {
        console.error("register error: ", error);
    }

}
}

exports.loginTiers = async (req, res) => {
  try {
      const { MAIL, password } = req.body;
      const result = await pool.query('SELECT * FROM DEV_TIERS WHERE MAIL = ?', [MAIL]);
      const tiers = result[0]; 

      if (tiers && bcrypt.compareSync(password, tiers.password)) {
          const accessToken = jwt.sign({ MAIL: tiers.MAIL, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.ACCESS_JWT_KEY);
          res.status(200).json({ message: "User is now connected!", accessToken: accessToken });
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
      const Tiers = await Tiers.findOne({ MAIL: decoded.MAIL });
      if (!Tiers) {
          return res.status(404).send({ message: "User not found." });
      }
      return res.status(200).send({ message: "Access granted." });
  });
};



