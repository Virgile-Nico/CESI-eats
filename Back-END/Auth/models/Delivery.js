const pool = require('../controllers/dbMaria'); 

// class Restaurant
class Delivery {
    constructor(id, email, password, name, firstName, tel, rib, vehicleType) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.firstName = firstName;
        this.tel = tel;
        this.rib = rib;
        this.vehicleType = vehicleType;
    }

    // save new delivery person
    save() {
        return pool.query('INSERT INTO livreurs (email, password, name, first_name, tel, rib, vehicle_type) VALUES (?, ?, ?, ?, ?, ?, ?)', [this.email, this.password, this.name, this.firstName, this.tel, this.rib, this.vehicleType]);
    }

    // get delivery person by id
    static findById(id) {
        return pool.query('SELECT * FROM livreurs WHERE id = ?', [id]);
    }
}

module.exports = Delivery;
