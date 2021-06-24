const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const prettyDate = (date: Date): string => {
  const dayFormatted = getDayFormatted(date);
  const year = date.getFullYear();
  const monthName = getMonthName(date);
  const formatted = `${dayFormatted} ${monthName}, ${year}`;
  return formatted;
};
export const getDayFormatted = (date: Date): string => {
  const day = "" + date.getDate();
  const dayFormatted = day.length === 1 ? "0" + day : day;
  return dayFormatted;
};
export const getWeekday = (date: Date): string => {
  const dayName = days[date.getDay()];
  return dayName;
};
export const getMonthName = (date: Date): string => {
  const monthName = months[date.getMonth()];
  return monthName;
};
