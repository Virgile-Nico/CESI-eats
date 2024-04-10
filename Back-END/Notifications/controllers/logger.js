const Logs = require("../models/loggers");

module.exports = {
    logaction: async function  (action_type, route, success = false, message = "") {
        const current = new Date();
        var options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const line = new Logs({
            timestamp: current.toLocaleDateString('fr', options),
            service: "Notifications",
            action_type: action_type,
            route: route,
            success: success,
            message: message,
        })
        await line.save();
    }
}