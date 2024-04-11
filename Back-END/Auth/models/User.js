const pool = require('../controllers/dbMaria'); 

// class user
class user {
    constructor(ID, MAIL, PASSWORD, NOM, PRENOM, TEL, CODE_PARRAIN, CODE_PARAINAGE) {
        this.ID = ID;
        this.MAIL = MAIL;
        this.PASSWORD = PASSWORD;
        this.NOM = NOM;
        this.PRENOM = PRENOM;
        this.TEL = TEL;
        this.CODE_PARRAIN = CODE_PARRAIN;
        this.CODE_PARAINAGE = CODE_PARAINAGE;

    }

    // get user by ID
    static findByID(ID) {
        return pool.query('SELECT * FROM CLIENTS WHERE ID = ?', [ID]);
    }
}
module.exports = user;