const passportGoogle = require('passport-google-oauth')

const Author = require('../controllers/author.controller')

const config = require('config')


const googleOptions = {
    clientID: config.get('googleClientId'),
    clientSecret: config.get('googleSecretKey'),
    callbackURL: `${config.get('serverUrl')}/api/auth/google/redirect`
}

const googleStrategy = new passportGoogle.OAuth2Strategy(googleOptions,
    async (_request, _accessToken, _refreshToken, profile, done) => { 
        const email = profile._json.email
        const author = await Author.login(email, undefined, 'google') // Magic Const

        return done(null, author)
})

module.exports = googleStrategy
