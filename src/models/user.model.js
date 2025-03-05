const crypto = require("crypto");

// Mock database (replace with real DB in production)
let users = [];

class UserModel {
	static async findByUsername(username) {
		return users.find((user) => user.username === username);
	}

	static hashPassword(password) {
		return new Promise((resolve, reject) => {
			const salt = crypto.randomBytes(16).toString("hex");
			crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
				if (err) reject(err);
				const hashedPassword = `${salt}:${derivedKey.toString("hex")}`;
				resolve(hashedPassword);
			});
		});
	}

	static verifyPassword(password, storedHash) {
		return new Promise((resolve, reject) => {
			const [salt, originalHash] = storedHash.split(":");
			crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
				if (err) reject(err);
				resolve(derivedKey.toString("hex") === originalHash);
			});
		});
	}

	static async create(username, password) {
		const hashedPassword = await this.hashPassword(password);
		const user = {
			id: users.length + 1,
			username,
			password: hashedPassword,
		};
		users.push(user);
		return user;
	}
}

module.exports = UserModel;
