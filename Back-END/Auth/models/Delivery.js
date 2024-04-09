const pool = require('../controllers/dbMaria'); 

// class Delivery
class Delivery {
    constructor(ID, MAIL, PASSWORD, NOM, PRENOM, tel, RIB, VEHICULE_TYPE) {
        this.ID = ID;
        this.MAIL = MAIL;
        this.PASSWORD = PASSWORD;
        this.NOM = NOM;
        this.PRENOM = PRENOM;
        this.RIB = RIB;
        this.VEHICULE_TYPE = VEHICULE_TYPE;
    }

    // save new delivery person
    save() {
        return pool.query('INSERT INTO livreurs (MAIL, PASSWORD, NOM, PRENOM, RIB, VEHICULE_TYPE) VALUES (?, ?, ?, ?, ?, ?)', [this.MAIL, this.PASSWORD, this.NOM, this.PRENOM, this.RIB, this.VEHICULE_TYPE]);
    }

    // get delivery person by ID
    static findByID(ID) {
        return pool.query('SELECT * FROM livreurs WHERE ID = ?', [ID]);
    }
}

module.exports = Delivery;
