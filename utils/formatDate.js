function formatDate(date) {
    let hour = '' + date.getHours()
    let minutes = '' + date.getMinutes()

    if (hour.length < 2) hour = '0' + hour;
    if (minutes.length < 2) minutes = '0' + minutes;

    return [hour, minutes].join(':')
}

function formatDay(date) {
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    let year = date.getFullYear()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-')
}


module.exports = { formatDate, formatDay }