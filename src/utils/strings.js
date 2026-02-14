export const formattedMeasurement = (option) => {
    return `(${option.width_m}x${option.length_m}x${option.height_m} cm)`
};

export const getChatName = (room) => {
    if (!room) return ''
    if (room.room_type === 'order' && room.order) {
        return `ORD-${room.order.code}`
    } else if (room.room_type === 'order' && !room.order) {
        return `REQ-${room.code}`
    } else {
        return 'Bereketli support'
    }
}

export const getChatInitials = (room) => {
    if (!room) return '?'
    const name = getChatName(room)
    return String(name).slice(0, 2).toUpperCase()
}

export const getSenderName = (message) => {
    if (!message?.sender) return 'Unknown'
    const { first_name, last_name } = message.sender
    if (first_name || last_name) {
        return `${first_name || ''} ${last_name || ''}`.trim()
    }
    return message.sender.phone_number || message.sender.email || 'Unknown'
}

export const getSenderInitials = (message) => {
    const name = getSenderName(message)
    const parts = name.split(' ')
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
}