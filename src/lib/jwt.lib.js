const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

const sign = (payload = {}) => {
    return jwt.sign(payload, JWT_KEY, { expiresIn: "8h" });
}

const verify = (token) => {
    return jwt.verify(token, JWT_KEY);
}

module.exports = { sign, verify }