const jwt = require("jsonwebtoken");

const token = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.KEY, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = { token };
