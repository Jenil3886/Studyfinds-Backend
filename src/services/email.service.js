// src/services/email.service.js
const nodemailer = require("nodemailer");

class EmailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});
	}

	async sendEmail({ to, subject, body }) {
		const mailOptions = {
			from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`,
			to,
			subject,
			html: body,
		};

		try {
			await this.transporter.sendMail(mailOptions);
		} catch (error) {
			console.log(`Error sending mail: ${error}`);
		}
	}
}

module.exports = EmailService;
