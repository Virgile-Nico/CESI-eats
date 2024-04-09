const select_query = "SELECT * FROM LIVREURS WHERE (ID = ?)";
const update_query = "UPDATE LIVREURS SET MAIL = ?, NOM = ?, PRENOM = ?, RIB = ?, VEHICULE_TYPE = ? WHERE (ID = ?)";
const delete_query = "DELETE FROM LIVREURS WHERE (ID = ?)";

const mariadb = require("../controllers/dbMaria")

module.exports = {
    select: async function (id) {
        const response = await mariadb.query(select_query, id);
        const result = response[0]
        return result;
    },
    update: async function (id, data) {
        const result = await mariadb.query(update_query, [data.mail, data.nom, data.prenom, data.rib, data.vehicule_type, id]);
        return result;
    },
    delete: async function (id) {
        const result = await mariadb.query(delete_query, id)
        return result;
    }
}