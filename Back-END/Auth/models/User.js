const pool = require('../controllers/dbMaria'); 

// class user
class user {
    constructor(id, email, password, name, firstName, telephone, codeParrain, codeParrainage) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.firstName = firstName;
        this.telephone = telephone;
        this.codeParrain = codeParrain;
        this.codeParrainage = codeParrainage;

    }


    // save new user
    save() {
        return pool.query('INSERT INTO clients (email, password, name, first_name, telephone, codeParrain, vehicle_type) VALUES (?, ?, ?, ?, ?, ?, ?)', [this.email, this.password, this.name, this.firstName, this.tel, this.rib, this.vehicleType]);
    }

    // get user by id
    static findById(id) {
        return pool.query('SELECT * FROM clients WHERE id = ?', [id]);
    }
}
module.exports = user;