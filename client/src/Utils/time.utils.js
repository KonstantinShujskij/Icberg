export const formatTime = function(milliseconds) {
    if(!milliseconds) return null

    const timestamp = new Date(milliseconds)

    const yers = timestamp.getFullYear()
    const month = timestamp.getMonth() + 1
    const date = timestamp.getDate()

    const hour = timestamp.getHours()
    const minutes = timestamp.getMinutes()

    const date_str = date > 9? date : `0${date}`
    const month_str = month > 9? month : `0${month}`

    const hour_str = hour > 9? hour : `0${hour}`
    const minutes_str = minutes > 9? minutes : `0${minutes}`

    const format = `${date_str}.${month_str}.${yers} ${hour_str}:${minutes_str}`
    return format
}