const pool = require('../controllers/dbMaria'); 

// class Tiers
class Tiers {
    constructor(ID, MAIL, PASSWORD, NOM, PRENOM, ENTREPRISE) {
        this.ID = ID;
        this.MAIL = MAIL;
        this.PASSWORD = PASSWORD;
        this.NOM = NOM;
        this.PRENOM = PRENOM;
        this.ENTREPRISE = ENTREPRISE;
    }



    // get third-party developer by ID
    static findByID(ID) {
        return pool.query('SELECT * FROM dev_tiers WHERE ID = ?', [ID]);
    }
}
module.exports = Tiers;