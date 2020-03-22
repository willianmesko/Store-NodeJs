const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2f5f8636c9e414",
    pass: "43bd8a8c5162b4"
  }
})

module.exports = transport
