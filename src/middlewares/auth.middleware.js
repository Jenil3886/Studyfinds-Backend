const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.js");
const { ERROR_MSG } = require("../utils/messages.js");

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: ERROR_MSG.TOKEN_NOT_PROVIDED });
	}

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ message: ERROR_MSG.INVALID_TOKEN });
		}
		req.user = user;
		next();
	});
};

module.exports = { authenticateToken };
