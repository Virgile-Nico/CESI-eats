const pool = require('../controllers/dbMaria'); 

// class Tiers
class Tiers {
    constructor(id, email, password, name, firstName, entreprise) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.firstName = firstName;
        this.entreprise = entreprise;
    }


    // save new third-party developer
    save() {
        return pool.query('INSERT INTO dev_tiers (email, password, name, first_name, entreprise) VALUES (?, ?, ?, ?, ?)', [this.email, this.password, this.name, this.firstName, this.entreprise]);
    }

    // get third-party developer by id
    static findById(id) {
        return pool.query('SELECT * FROM dev_tiers WHERE id = ?', [id]);
    }
}
module.exports = Tiers;