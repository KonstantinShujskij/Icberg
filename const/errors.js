module.exports = {
    notAuth: { answer: { error: 'Bad Auth' }, custom: true },
    notAccess: { answer: { error: 'Not Access' }, custom: true },
    notFind: { answer: { error: 'Not Find' }, custom: true },
    notComplite: { answer: { error: 'Your account no complite' }, custom: true },
    IncorectEmail: { answer: { error: 'Incorect Email' }, custom: true },
    IncorectPassword: { answer: { error: 'Incorect Password. Password most include 8 or more symbols' }, custom: true },
    IncorectName: { answer: { error: 'Incorect Name. Name most be longer of two symbols' }, custom: true },
    IncorectLastname: { answer: { error: 'Incorect Lastname. Lastname most be longer of two symbols' }, custom: true },
    IncorectWebsite: { answer: { error: 'Incorect Website. Website most be correct url' }, custom: true },
    IncorectTitle: { answer: { error: 'Incorect Title. Title most include 6 or more symbols' }, custom: true },
    IncorectDescription: { answer: { error: 'Incorect Description. Description  most include 40 or more symbols' }, custom: true },
    IncorectText: { answer: { error: 'Incorect Text. Text most include 1000 or more symbols' }, custom: true },
    IncorectComent: { answer: { error: 'Incorect Coment. Coment most include 40 or more symbols' }, custom: true },

    authorIsExist: { answer: { error: 'User Is Exist' }, custom: true },
    arcleIsExist: { answer: { error: 'Arcle Is Exist' }, custom: true },

    notSendMail: { answer: { error: 'We cant send mail to your adress' }, custom: true },

    noCaptcha: { answer: { error: 'Request not has captcha sign' }, custom: true },
    noValidCaptcha: { answer: { error: 'Captcha not valid' }, custom: true },
    noAliveCaptcha: { answer: { error: 'Captcha time out' }, custom: true },

    unknown: { answer: { error: "Something went wrong..." }, custom: true  },
}
