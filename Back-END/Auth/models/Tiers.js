const pool = require('../controllers/dbMaria'); 

// class Tiers
class Tiers {
    constructor(id, email, password, name, firstName, tel, rib, vehicleType) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.firstName = firstName;
        this.entreprise = entreprise;
    }


    // save new third-party developer
    save() {
        return pool.query('INSERT INTO tiers (email, password, name, first_name, tel, rib, vehicle_type) VALUES (?, ?, ?, ?, ?, ?, ?)', [this.email, this.password, this.name, this.firstName, this.tel, this.rib, this.vehicleType]);
    }

    // get third-party developer by id
    static findById(id) {
        return pool.query('SELECT * FROM tiers WHERE id = ?', [id]);
    }
}
module.exports = Tiers;