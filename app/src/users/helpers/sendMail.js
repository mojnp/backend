const { randomDigits } = require('crypto')

class Email {
  constructor (sender, receiver, smtpPassword) {
    this.sender = sender
    this.receiver = receiver
    this.smtpPassword = smtpPassword
    this.code = randomDigits(6).join('')
  }

  _parse_mail () {
    const mailOptions = {
      from: this.sender,
      to: this.receiver,
      subject: 'Confirm your email address',
      text: 'Hello, please confirm your email address',
      html: `<p>Hello, please confirm your email address</p><p>${this.code}</p>`
    }
    return mailOptions
  }

  async send_code () {
    try {
      return `Code sent to ${this.receiver}`
    } catch (error) {
      console.error('Error sending email:', error)
      throw new Error('Failed to send email')
    }
  }
}

module.exports = Email
