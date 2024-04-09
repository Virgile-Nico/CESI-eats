const pool = require('../controllers/dbMaria'); 

    //class Restaurant
class Restaurant {
    constructor(id, email, password, name, tel, postalCode, city, address, siren, rib) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.tel = tel;
        this.postalCode = postalCode;
        this.city = city;
        this.address = address;
        this.siren = siren;
        this.rib = rib;
    }

    //save new restaurant
    save() {
        return pool.query('INSERT INTO restaurant (email, password, name, tel, postal_code, city, address, siren, rib) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [this.email, this.password, this.name, this.tel, this.postalCode, this.city, this.address, this.siren, this.rib]);
    }

    //find restaurant by id
    static findById(id) {
        return pool.query('SELECT * FROM restaurant WHERE id = ?', [id]);
    }
}

module.exports = Restaurant;
