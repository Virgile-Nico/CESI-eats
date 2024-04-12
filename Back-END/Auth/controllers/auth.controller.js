const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Delivery = require('../models/Delivery');
const Intern = require('../models/Intern');
const Restaurant = require('../models/Restaurant');
const Tiers = require('../models/Tiers');
const pool = require('../controllers/dbMaria');
const categories = require('../models/categories');

const generateCodeParrain = function () {
    const length = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    
    return code;
};

module.exports = {
    registerUser: async (body) => {
        try {
            const queryResult = await pool.query('SELECT * FROM CLIENTS WHERE MAIL = ?', [body.MAIL]);
            const userExists = queryResult.length > 0;
    
            if (userExists) {
                return res.status(400).json({ "error": "email already exists." });
            }
            const hashedPassword = bcrypt.hashSync(body.PASSWORD, 10);
            await pool.query('INSERT INTO CLIENTS (MAIL, PASSWORD, NOM, PRENOM, TEL, CODE_PARRAIN, CODE_PARAINAGE) VALUES (?, ?, ?, ?, ?, ?, ?)', [body.MAIL, hashedPassword, body.FIRSTNAME, body.LASTNAME, body.PHONE, body.sponsorCode, generateCodeParrain()]);
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
                        { expiresIn: '1h' } 
                    );                    
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
        let token = body;
        console.log(token)
        try {
            console.log("Token: ", token);
            //verify the token
            const decoded = jwt.verify(token, process.env.ACCESS_JWT_KEY);
            //get the user from the database
            const query = 'SELECT * FROM CLIENTS WHERE MAIL = ?';
            const users = await pool.query(query, [decoded.MAIL]);
                if (users.length === 0) {
                console.log("User not found.");
                return { status: 404, message: "User not found." };
            }
            //get the user
            const user = users[0]; 
    
            console.log("User: ", user);
            //return the user
            return {
                status: 200,
                message: "User authenticated successfully.",
                user: {
                    ID: user.ID,
                    MAIL: user.MAIL,
                }
            };
        } catch (error) {
            console.error("Authentication error: ", error);
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
        await pool.query('INSERT INTO LIVREURS (MAIL, PASSWORD, NOM, PRENOM, RIB, VEHICULE_TYPE) VALUES (?, ?, ?, ?, ?, ?)', [body.MAIL, hashedPassword, body.FIRSTNAME, body.LASTNAME, body.PHONE, hashedRIB, body.VEHICULE_TYPE]);
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

    authenticateDelivery : async (body) => {
        let token = body;
        console.log(token)
        try {
            console.log("Token: ", token);
            const decoded = jwt.verify(token, process.env.ACCESS_JWT_KEY);
            const query = 'SELECT * FROM LIVREURS WHERE MAIL = ?';
            const users = await pool.query(query, [decoded.MAIL]);
                if (users.length === 0) {
                console.log("User not found.");
                return { status: 404, message: "User not found." };
            }
    
            const user = users[0]; 
    
            console.log("User: ", user);
            return {
                status: 200,
                message: "User authenticated successfully.",
                user: {
                    ID: user.ID,
                    MAIL: user.MAIL,
                }
            };
        } catch (error) {
            console.error("Authentication error: ", error);
            return { status: 401, message: "Authentication failed." };
        }
    },

    registerIntern : async (body) => {
    try {
        const queryResult = await pool.query('SELECT * FROM INTERN WHERE MAIL = ?', [body.MAIL]);
        const InternExists = queryResult.length > 0;

        if (InternExists) {
            return res.status(400).json({ "error": "email already exists." });
        }
        const hashedPassword = bcrypt.hashSync(body.PASSWORD, 10);
        await pool.query('INSERT INTO INTERN (MAIL, PASSWORD, NOM, PRENOM, TYPE) VALUES (?, ?, ?, ?, ?)', [body.MAIL, hashedPassword, body.FIRSTNAME, body.LASTNAME, body.TYPE]);
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

    authenticateIntern : async (body) => {
        let token = body;
        console.log(token)
        try {
            console.log("Token: ", token);
            const decoded = jwt.verify(token, process.env.ACCESS_JWT_KEY);
            const query = 'SELECT * FROM INTERN WHERE MAIL = ?';
            const users = await pool.query(query, [decoded.MAIL]);
                if (users.length === 0) {
                console.log("User not found.");
                return { status: 404, message: "User not found." };
            }
    
            const user = users[0]; 
    
            console.log("User: ", user);
            return {
                status: 200,
                message: "User authenticated successfully.",
                user: {
                    ID: user.ID,
                    MAIL: user.MAIL,
                }
            };
        } catch (error) {
            console.error("Authentication error: ", error);
            return { status: 401, message: "Authentication failed." };
        }
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
        let ID = await pool.query(`SELECT ID FROM RESTAURANT WHERE MAIL = ${body.MAIL}`)
        const newest = new categories(ID , body.categories)
        newest.save();
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

    authenticateRestaurant : async (body) => {
        let token = body;
        console.log(token)
        try {
            console.log("Token: ", token);
            const decoded = jwt.verify(token, process.env.ACCESS_JWT_KEY);
            const query = 'SELECT * FROM RESTAURANT WHERE MAIL = ?';
            const users = await pool.query(query, [decoded.MAIL]);
                if (users.length === 0) {
                console.log("User not found.");
                return { status: 404, message: "User not found." };
            }
    
            const user = users[0]; 
    
            console.log("User: ", user);
            return {
                status: 200,
                message: "User authenticated successfully.",
                user: {
                    ID: user.ID,
                    MAIL: user.MAIL,
                }
            };
        } catch (error) {
            console.error("Authentication error: ", error);
            return { status: 401, message: "Authentication failed." };
        }
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

    authenticateTiers : async (body) => {
        let token = body;
        console.log(token)
        try {
            console.log("Token: ", token);
            const decoded = jwt.verify(token, process.env.ACCESS_JWT_KEY);
            const query = 'SELECT * FROM DEV_TIERS WHERE MAIL = ?';
            const users = await pool.query(query, [decoded.MAIL]);
                if (users.length === 0) {
                console.log("User not found.");
                return { status: 404, message: "User not found." };
            }
    
            const user = users[0]; 
    
            console.log("User: ", user);
            return {
                status: 200,
                message: "User authenticated successfully.",
                user: {
                    ID: user.ID,
                    MAIL: user.MAIL,
                }
            };
        } catch (error) {
            console.error("Authentication error: ", error);
            return { status: 401, message: "Authentication failed." };
        }
    },
}

