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


    //find restaurant by ID
    static findByID(ID) {
        return pool.query('SELECT * FROM restaurant WHERE ID = ?', [ID]);
    }
}

module.exports = Restaurant;
