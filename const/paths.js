module.exports = {
    arclesDir: (author) => `store/images/${author}/arcles/`,
    arcleImage: (author, image) => `store/images/${author}/arcles/${image}`,
    authorDir: (author) => `store/images/${author}/`,
    authorAvatar: (author, avatar) => `store/images/${author}/${avatar}`
}