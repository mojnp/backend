const nodemailer = require("nodemailer");
const { randomInt } = require("crypto");

class Email {
    constructor(sender, receiver, smtpPassword) {
        this.sender = sender;
        this.receiver = receiver;
        this.smtpPassword = smtpPassword;
        this.code = Array.from({ length: 6 }, () => randomInt(10)).join("");
    }

    _createTransporter() {
        return nodemailer.createTransport({
            service: "Gmail", // Update with your email service provider
            auth: {
                user: this.sender,
                pass: this.smtpPassword,
            },
        });
    }

    async sendCode() {
        const transporter = this._createTransporter();

        const mailOptions = {
            from: this.sender,
            to: this.receiver,
            subject: "Confirm your email address",
            text: "Hello, please confirm your email address",
            html: `<p>Hello, please confirm your email address</p><p>${this.code}</p>`,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            return `Code sent to ${this.receiver}`;
        } catch (error) {
            throw new Error("Failed to send email");
        }
    }
}

module.exports = Email;
