export const formatTime = function(milliseconds) {
    if(!milliseconds) return null

    const timestamp = new Date(milliseconds)

    const yers = timestamp.getFullYear()
    const month = timestamp.getMonth()
    const date = timestamp.getDate()

    const hour = timestamp.getHours()
    const minutes = timestamp.getMinutes()

    const format = `${date}.${month}.${yers} ${hour}:${minutes}`
    return format
}