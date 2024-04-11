const pool = require('../controllers/dbMaria'); 

// class Intern
class Intern {
    constructor(ID, MAIL, PASSWORD, NOM, PRENOM, TYPE) {
        this.ID = ID;
        this.MAIL = MAIL;
        this.PASSWORD = PASSWORD;
        this.NOM = NOM;
        this.PRENOM = PRENOM;
        this.TYPE = TYPE;
    }

    // get person in the internal service by ID
    static findByID(ID) {
        return pool.query('SELECT * FROM intern WHERE ID = ?', [ID]);
    }
}
module.exports = Intern;
