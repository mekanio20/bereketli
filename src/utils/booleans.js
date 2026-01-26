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