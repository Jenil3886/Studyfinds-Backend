module.exports = {
	JWT_SECRET: process.env.JWT_SECRET || "a-string-secret-at-least-256-bits-long",
	PORT: process.env.PORT || 3000,
};
