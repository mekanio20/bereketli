export const formatToYYYYMMDD = (input) => {
  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date)) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}.${month}.${year}`;
};

export const parseTRDate = (str) => {
  if (!str) return null

  const [dd, mm, yyyy] = str.split('.')
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd))
}

export const formatToRuDate = (day) => {
    const n = Math.abs(day) % 100;
    const n1 = n % 10;

    if (n > 10 && n < 20) {
        return `${day} дней`;
    }
    if (n1 === 1) {
        return `${day} день`;
    }
    if (n1 >= 2 && n1 <= 4) {
        return `${day} дня`;
    }
    
    return `${day} дней`;
}