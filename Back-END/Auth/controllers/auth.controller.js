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
    
    },

    loginUser : async (body) => {
        try {

            if (!body.MAIL || !body.PASSWORD) {
                return { status: 400, message: "Email and password are required." };
            }
            
            const [user] = await pool.query('SELECT * FROM CLIENTS WHERE MAIL = ?', [body.MAIL]);
            
            if (user) {
                if (bcrypt.compareSync(body.PASSWORD, user.PASSWORD)) {
                    const accessToken = jwt.sign(
                        { ID: user.ID, MAIL: user.MAIL },
                        process.env.ACCESS_JWT_KEY, 
                        { expiresIn: '1h' },
                    );
                    console.log(accessToken)
                    return {
                        status: 200,
                        message: "Authentication successful!",
                        accessToken : accessToken
                    };
                } else {
                    console.log("Invalid email or password.");
                    return { status: 401, message: "Invalid email or password." };
                }
            } else {
                console.log("User not found.");
                return { status: 404, message: "User not found." };
            }
        } catch (error) {
            console.error("Login error: ", error);
            return { status: 500, message: "An error occurred during the login process." };
        }
    },

    authenticateUser : async (body) => {
        const token = body;
        console.log(token)
        try {
            console.log("Token: ", token);
            // Vérifie la validité du token JWT
            const decoded = jwt.verify(token, process.env.ACCESS_JWT_KEY);
            
            // Ici, on suppose que le payload du token contient l'email de l'utilisateur (MAIL)
            const query = 'SELECT * FROM CLIENTS WHERE MAIL = ?';
            const users = await pool.query(query, [decoded.MAIL]);
    
            // Vérifie si au moins un utilisateur correspondant a été trouvé
            if (users.length === 0) {
                console.log("User not found.");
                return { status: 404, message: "User not found." };
            }
    
            const user = users[0]; // Prend le premier utilisateur trouvé
    
            console.log("User: ", user);
            // Utilisateur authentifié avec succès
            return {
                status: 200,
                message: "User authenticated successfully.",
                user: {
                    ID: user.ID,
                    MAIL: user.MAIL,
                    // Incluez d'autres champs au besoin, mais excluez les informations sensibles
                }
            };
        } catch (error) {
            console.error("Authentication error: ", error);
            // Le token n'est pas valide ou a expiré
            return { status: 401, message: "Authentication failed." };
        }
    },

    //below are the functions for the other types of models
  //they are similar to the user functions
  //the only difference is the model used
  //and the fields used in the model
  
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

    },

    loginDelivery : async (body) => {
    try {
        if (!body.MAIL || !body.PASSWORD) {
            console.log("Email and password are required.");
            return { status: 400, message: "Email and password are required." };
        }
        const [user] = await pool.query('SELECT * FROM LIVREURS WHERE MAIL = ?', [body.MAIL]);
        
        if (user) {
            if (bcrypt.compareSync(body.PASSWORD, user.PASSWORD)) {
                const accessToken = jwt.sign(
                    { ID: user.ID, MAIL: user.MAIL },
                    process.env.ACCESS_JWT_KEY, 
                    { expiresIn: '1h' },
                );
                console.log(accessToken)
                return {
                    status: 200,
                    message: "Authentication successful!",
                    accessToken : accessToken
                };
            } else {
                console.log("Invalid email or password.");
                return { status: 401, message: "Invalid email or password." };
            }
        } else {
            console.log("User not found.");
            return { status: 404, message: "User not found." };
        }
    } catch (error) {
        console.error("Login error: ", error);
        return { status: 500, message: "An error occurred during the login process." };
    }
    },

    authenticateDelivery : (req, res) => {
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
    },

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

    },

    loginIntern : async (body) => {
    try {
        if (!body.MAIL || !body.PASSWORD) {
            console.log("Email and password are required.");
            return { status: 400, message: "Email and password are required." };
        }
        const [user] = await pool.query('SELECT * FROM INTERN WHERE MAIL = ?', [body.MAIL]);
        
        if (user) {
            if (bcrypt.compareSync(body.PASSWORD, user.PASSWORD)) {
                const accessToken = jwt.sign(
                    { ID: user.ID, MAIL: user.MAIL },
                    process.env.ACCESS_JWT_KEY, 
                    { expiresIn: '1h' },
                );
                console.log(accessToken)
                return {
                    status: 200,
                    message: "Authentication successful!",
                    accessToken : accessToken
                };
            } else {
                console.log("Invalid email or password.");
                return { status: 401, message: "Invalid email or password." };
            }
        } else {
            console.log("User not found.");
            return { status: 404, message: "User not found." };
        }
    } catch (error) {
        console.error("Login error: ", error);
        return { status: 500, message: "An error occurred during the login process." };
    }
    },

    authenticateIntern : (req, res) => {
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
    },

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

    },

    loginRestaurant : async (body) => {
    try {
        if (!body.MAIL || !body.PASSWORD) {
            console.log("Email and password are required.");
            return { status: 400, message: "Email and password are required." };
        }
        const [user] = await pool.query('SELECT * FROM RESTAURANT WHERE MAIL = ?', [body.MAIL]);
        
        if (user) {
            if (bcrypt.compareSync(body.PASSWORD, user.PASSWORD)) {
                const accessToken = jwt.sign(
                    { ID: user.ID, MAIL: user.MAIL },
                    process.env.ACCESS_JWT_KEY, 
                    { expiresIn: '1h' },
                );
                console.log(accessToken)
                return {
                    status: 200,
                    message: "Authentication successful!",
                    accessToken : accessToken
                };
            } else {
                console.log("Invalid email or password.");
                return { status: 401, message: "Invalid email or password." };
            }
        } else {
            console.log("User not found.");
            return { status: 404, message: "User not found." };
        }
    } catch (error) {
        console.error("Login error: ", error);
        return { status: 500, message: "An error occurred during the login process." };
    }
    },

    authenticateRestaurant : (req, res) => {
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
    },

    registerTiers: async (body) => {
    try {
        const queryResult = await pool.query('SELECT * FROM DEV_TIERS WHERE MAIL = ?', [body.MAIL]);
        const TiersExists = queryResult.length > 0;

        if (TiersExists) {
            return  "error email already exists." ;
        }
        const hashedPassword = bcrypt.hashSync(body.PASSWORD, 10);
        await pool.query('INSERT INTO DEV_TIERS (MAIL, PASSWORD, NOM, PRENOM, ENTREPRISE) VALUES (?, ?, ?, ?, ?)', [body.MAIL, hashedPassword, body.NOM, body.PRENOM, body.ENTREPRISE]);
    } catch (error) {
        console.error("register error: ", error);
    }

    },

    loginTiers : async (body) => {
    try {
        if (!body.MAIL || !body.PASSWORD) {
            console.log("Email and password are required.");
            return { status: 400, message: "Email and password are required." };
        }
        const [user] = await pool.query('SELECT * FROM DEV_TIERS WHERE MAIL = ?', [body.MAIL]);
        
        if (user) {
            if (bcrypt.compareSync(body.PASSWORD, user.PASSWORD)) {
                const accessToken = jwt.sign(
                    { ID: user.ID, MAIL: user.MAIL },
                    process.env.ACCESS_JWT_KEY, 
                    { expiresIn: '1h' },
                );
                console.log(accessToken)
                return {
                    status: 200,
                    message: "Authentication successful!",
                    accessToken : accessToken
                };
            } else {
                console.log("Invalid email or password.");
                return { status: 401, message: "Invalid email or password." };
            }
        } else {
            console.log("User not found.");
            return { status: 404, message: "User not found." };
        }
    } catch (error) {
        console.error("Login error: ", error);
        return { status: 500, message: "An error occurred during the login process." };
    }
    },

    authenticateTiers : (req, res) => {
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
    }
}

