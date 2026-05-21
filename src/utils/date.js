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

export const getWarehouseStatus = (warehouse) => {
  const now = new Date();

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const today = days[now.getDay()];

  const startTime = warehouse[`${today}_start`];
  const endTime = warehouse[`${today}_end`];

  if (!startTime || !endTime) {
    return {
      isOpen: false,
      message: "Closed today",
    };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [startHour, startMinute] = startTime.split(":");
  const startTotalMinutes =
    Number(startHour) * 60 + Number(startMinute);

  const [endHour, endMinute] = endTime.split(":");
  const endTotalMinutes =
    Number(endHour) * 60 + Number(endMinute);

  const isOpen =
    currentMinutes >= startTotalMinutes &&
    currentMinutes <= endTotalMinutes;

  return {
    isOpen,
    today,
    workingHours: `${startTime} - ${endTime}`,
  };
}