const Jimp = require('jimp') 
const jwt = require('jsonwebtoken')
const fs = require('fs')

const config = require('config')
const consts = require('../consts')


const regToken = () => {
    const hash = fs.readFileSync(consts.captcha.hashPath, 'utf8')
    const newHash = hash + '1'
    fs.writeFileSync(consts.captcha.hashPath, newHash)
}

const getSeed = () => {
    regToken()

    const seed = parseInt(fs.readFileSync(consts.captcha.seedPath, 'utf8'))
    const newSeed = (seed + 1).toString()
    fs.writeFileSync(consts.captcha.seedPath, newSeed)
    
    return seed
}

const verify = (token, answer) => {
    const secret = config.get('jwtSecret')
    const { angle, seed } = jwt.verify(token, secret)

    const hash = fs.readFileSync(consts.captcha.hashPath, 'utf8')
    const match = hash.length > seed? hash[seed] === '1' : false

    if(!match) { return false }

    const newHash = hash.substring(0, seed) + '0' + hash.substring(seed + 1)
    fs.writeFileSync(consts.captcha.hashPath, newHash)

    return answer === angle
}

async function getImage(angle) {
    const n = parseInt(Math.random() * consts.captcha.pullLen)
    const timestamp = Date.now()
    const tempId = `temp-${timestamp}-${n}`

    const image = await Jimp.read(`${consts.captcha.imagePath}/${n}.png`)
    const rotateImage = image.rotate(angle)

    let resultImage = rotateImage

    const rotateImageSize = rotateImage.bitmap.width
    if(rotateImage !== consts.captcha.imageSize) { 
        const offset = (rotateImageSize - consts.captcha.imageSize) / 2
        const size = consts.captcha.imageSize

        const cropImage = rotateImage.crop(offset, offset, size, size)
        resultImage = cropImage 
    }
    
    const tempPath = `${consts.captcha.tempPath}/${tempId}.png`
    await resultImage.writeAsync(tempPath)

    const bitmap = fs.readFileSync(tempPath)
    const base64 = Buffer.from(bitmap).toString('base64')

    fs.unlinkSync(tempPath)

    return base64
}

const generateCaptcha = async () => {
    const directionCount = consts.captcha.directions

    const angle = parseInt(Math.random() * (directionCount - 1)) + 1
    const degAngle = angle * (360 / directionCount)

    const image = await getImage(degAngle)
    const seed = getSeed()

    const secret = config.get('jwtSecret')
    const alive = config.get('captchaAlive')

    const token = jwt.sign({ angle, seed }, secret, { expiresIn: alive })

    return { image, token }
}

const reset = () => {
    fs.writeFileSync(consts.captcha.seedPath, '')
    fs.writeFileSync(consts.captcha.hashPath, '0')
}

module.exports = { 
    reset,
    generateCaptcha,
    verify
}
