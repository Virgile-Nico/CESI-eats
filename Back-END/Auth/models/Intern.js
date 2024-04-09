const pool = require('../controllers/dbMaria'); 

// class Intern
class Intern {
    constructor(id, email, password, name, firstName, type) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.firstName = firstName;
        this.type = type;
    }


    // save new person in the internal service
    save() {
        return pool.query('INSERT INTO intern (email, password, name, first_name, type) VALUES (?, ?, ?, ?, ?)', [this.email, this.password, this.name, this.firstName, this.type]);
    }

    // get person in the internal service by id
    static findById(id) {
        return pool.query('SELECT * FROM intern WHERE id = ?', [id]);
    }
}
module.exports = Intern;
