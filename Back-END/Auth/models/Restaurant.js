const pool = require('../controllers/dbMaria'); 

    //class Restaurant
class Restaurant {
    constructor(ID, MAIL, PASSWORD, NOM, TEL, PC, VILLE, ADRESSE, SIRET, RIB) {
        this.ID = ID;
        this.MAIL = MAIL;
        this.PASSWORD = PASSWORD;
        this.NOM = NOM;
        this.TEL = TEL;
        this.PC = PC;
        this.VILLE = VILLE;
        this.ADRESSE = ADRESSE;
        this.SIRET = SIRET;
        this.RIB = RIB;
    }

    //save new restaurant
    save() {
        return pool.query('INSERT INTO restaurant (MAIL, PASSWORD, NOM, TEL, PC, VILLE, ADRESSE, SIRET, RIB) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [this.MAIL, this.PASSWORD, this.NOM, this.TEL, this.PC, this.VILLE, this.ADRESSE, this.SIRET, this.RIB]);
    }

    //find restaurant by ID
    static findByID(ID) {
        return pool.query('SELECT * FROM restaurant WHERE ID = ?', [ID]);
    }
}

module.exports = Restaurant;
