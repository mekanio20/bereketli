export const usdToTmt = (amountUsd, rate) => {
  const usd = Number(amountUsd)
  const exchangeRate = Number(rate)

  if (!Number.isFinite(usd) || !Number.isFinite(exchangeRate)) {
    return 0
  }

  return +(usd * exchangeRate).toFixed(2)
}

export const tmtToUsd = (amountTmt, rate) => {
  const tmt = Number(amountTmt)
  const exchangeRate = Number(rate)

  if (!Number.isFinite(tmt) || !Number.isFinite(exchangeRate) || exchangeRate === 0) {
    return 0
  }

  return +(tmt / exchangeRate).toFixed(2)
}