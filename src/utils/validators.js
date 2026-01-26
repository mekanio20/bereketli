

export const hasValue = (value) => {
  // null, undefined, false
  if (value === null || value === undefined || value === false) {
    return false
  }

  // string
  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  // number
  if (typeof value === 'number') {
    return Number.isFinite(value) && value !== 0
  }

  // array
  if (Array.isArray(value)) {
    if (value.length === 0) return false
    return value.every(hasValue)
  }

  // object
  if (typeof value === 'object') {
    const values = Object.values(value)
    if (values.length === 0) return false
    return values.every(hasValue)
  }

  // boolean true, symbol vs.
  return true
}