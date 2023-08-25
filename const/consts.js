module.exports = {
    captcha: {
        seedPath: 'storage/captcha/hash.txt',
        hashPath: 'storage/captcha/seed.txt',
        imagePath: 'storage/captcha/images',
        tempPath: 'storage/captcha/temp',
        imageSize: 64,
        pullLen: 1250,
        directions: 8        
    }, 
    imagesLoadType: {
        avatar: 'avatar',
        arcle: 'arcle'
    },  
    authTypes: {
        google: 'google'
    },
    arcle: {
        title: {
            len: { min: 6, max: 64 },
        },
        description: {
            len: { min: 100, max: 500 },
        },
        text: {
            len: { min: 2000, max: 50000 },
        },
    },
    author: {
        password: {
            len: { min: 8, max: 24 },
        },
        name: {
            len: { min: 2, max: 16 },
        },
        lastname: {
            len: { min: 2, max: 16 },
        },
    },
    comment: {
        text: {
            len: { min: 150, max: 1000 },
        }
    }
}