import moment from 'moment'

const formatTime = async (time) => {
    return moment(time, 'HH:mm:ss').format('h:mm A')
}

const formatDate = async (date) => {
    return moment(date).format('MM/DD/YYYY')
}

const daysRemaining = async (date) => {
    const today = moment()
    const eventDate = moment(date)
    const diff = eventDate.diff(today)
    const duration = moment.duration(diff)
    const days = duration.asDays()
    return parseInt(days)
}

const formatRemainingTime = async (date) => {
    const today = moment()
    const eventDate = moment(date)

    // If the event has passed
    const remaining = await daysRemaining(date)
    if (remaining < 0) {
        return 'Event has passed'
    }

    const diff = eventDate.diff(today)
    const duration = moment.duration(diff)
    const days = duration.days()
    const months = duration.months()
    
    let res = ''
    if (months > 0) {
        res += `${months} months `
    }
    if (days > 0) {
        res += `${days} days`
    }
    if (months == 0 && days == 0) {
        res += 'Today'
    } else {
        res += ' remaining'
    }
    return res
}

export default {
    formatTime,
    formatDate,
    formatRemainingTime,
    daysRemaining
}