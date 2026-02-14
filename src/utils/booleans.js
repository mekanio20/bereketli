export const isWarehouseOpen = (startTime, endTime, now = new Date()) => {
  if (!startTime || !endTime) return false

  const toMinutes = (time) => {
    const [h, m, s] = time.split(':').map(Number)
    return h * 60 + m + (s ? s / 60 : 0)
  }

  const nowMinutes =
    now.getHours() * 60 +
    now.getMinutes() +
    now.getSeconds() / 60

  const startMinutes = toMinutes(startTime)
  const endMinutes = toMinutes(endTime)

  if (startMinutes < endMinutes) {
    return nowMinutes >= startMinutes && nowMinutes < endMinutes
  }

  return (
    nowMinutes >= startMinutes ||
    nowMinutes < endMinutes
  )
}

export const isMyMessage = (message, currentUser) => {
    if (!currentUser || !message?.sender) return false
    return currentUser === message.sender.id
}

export const isImageFile = (attachment) => {
    if (!attachment?.original_filename) return false
    const ext = attachment.original_filename.split('.').pop()?.toLowerCase()
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)
}