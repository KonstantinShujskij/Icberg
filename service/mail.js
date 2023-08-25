const nodemailer = require('nodemailer')

const config = require('config')
const errors = require('../const/errors')


const sendMail = (to, subject, text='', html='') => {
    const mail = config.get('mail') 

    const transporter = nodemailer.createTransport({ 
        host: mail.smtp,
        port: mail.port,
        secure: true,
        auth: { 
            user: mail.client, 
            pass: mail.password, 
        }
    })
    
    const options = { 
        from: `Site Developer Company <${mail.client}>`, 
        to, subject, text, html 
    }
    
    transporter.sendMail(options, function(error, _info) { if(error) { throw errors.notSendMail } })
}

const sendComfirmLink = (email, token) => {
    const url = `${config.get('baseUrl')}/confirm?token=${token}` 
    const html = `<p>Click this <a href="${url}" target='_blank'>link</a> to confirm your mail</p>`
    
    sendMail(email, 'Confirm Your email', '', html)
}

module.exports = {
    sendMail,
    sendComfirmLink
}