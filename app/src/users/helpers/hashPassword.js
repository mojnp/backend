const crypto = require('crypto')

function hashedPassword (password) {
  const hash = crypto.createHash('sha512')
  hash.update(password, 'utf-8')
  return hash.digest('hex')
}

module.exports = hashedPassword
