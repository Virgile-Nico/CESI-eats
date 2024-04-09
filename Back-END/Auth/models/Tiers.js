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


    // save new third-party developer
    save() {
        return pool.query('INSERT INTO dev_tiers (MAIL, PASSWORD, NOM, PRENOM, ENTREPRISE) VALUES (?, ?, ?, ?, ?)', [this.MAIL, this.PASSWORD, this.NOM, this.PRENOM, this.ENTREPRISE]);
    }

    // get third-party developer by ID
    static findByID(ID) {
        return pool.query('SELECT * FROM dev_tiers WHERE ID = ?', [ID]);
    }
}
module.exports = Tiers;