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


    // save new person in the internal service
    save() {
        return pool.query('INSERT INTO intern (MAIL, PASSWORD, NOM, PRENOM, TYPE) VALUES (?, ?, ?, ?, ?)', [this.MAIL, this.PASSWORD, this.NOM, this.PRENOM, this.TYPE]);
    }

    // get person in the internal service by ID
    static findByID(ID) {
        return pool.query('SELECT * FROM intern WHERE ID = ?', [ID]);
    }
}
module.exports = Intern;
