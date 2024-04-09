const pool = require('../controllers/dbMaria'); 

// class user
class user {
    constructor(ID, MAIL, PASSWORD, NOM, PRENOM, TEL, CODE_PARRAIN, CODE_PARRAINAGE) {
        this.ID = ID;
        this.MAIL = MAIL;
        this.PASSWORD = PASSWORD;
        this.NOM = NOM;
        this.PRENOM = PRENOM;
        this.TEL = TEL;
        this.CODE_PARRAIN = CODE_PARRAIN;
        this.CODE_PARRAINAGE = CODE_PARRAINAGE;

    }


    // save new user
    save() {
        return pool.query('INSERT INTO CLIENTS (MAIL, PASSWORD, NOM, PRENOM, TEL, CODE_PARRAIN, CODE_PARRAINAGE) VALUES (?, ?, ?, ?, ?, ?, ?)', [this.MAIL, this.PASSWORD, this.NOM, this.PRENOM, this.TEL, this.CODE_PARRAIN, this.CODE_PARRAINAGE]);
    }

    // get user by ID
    static findByID(ID) {
        return pool.query('SELECT * FROM CLIENTS WHERE ID = ?', [ID]);
    }
}
module.exports = user;