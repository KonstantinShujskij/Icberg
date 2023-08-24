module.exports = (payload) => {
    return (req, _res, next) => {
        if(req.method === 'OPTIONS') { return next() }

        if(req.customPayload) { req.customPayload = { ...req.customPayload, ...payload } }
        req.customPayload = payload

        next()
    }
}

