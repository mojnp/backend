const nodeMailer = require("nodemailer");

class Email {
    constructor(sender, receiver, smtpPassword) {
        this.sender = sender;
        this.receiver = receiver;
        this.smtpPassword = smtpPassword;
        this.code = Math.floor(100000 + Math.random() * 900000);
    }

    _parse_mail() {
        const mailOptions = {
            from: this.sender,
            to: this.receiver,
            subject: "Confirm your email address",
            text: "Hello, please confirm your email address",
            html: `<p>Hello, please confirm your email address</p><p>${this.code}</p>`,
        };
        return mailOptions;
    }

    async sendCode() {
        const mailOptions = this._parse_mail();
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: this.sender,
                pass: this.smtpPassword,
            },
        });

        try {
            await transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Failed to send email");
        }
    }
}

module.exports = Email;
