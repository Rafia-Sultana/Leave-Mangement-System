export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function FormateDate(date) {
  if (!date) return null;
  const formattedDate = `${date.getDate()}-${
    months[date.getMonth()]
  }, ${date.getFullYear()}`;

  return formattedDate;
}
export function getYear(date) {
  return `${date.getFullYear()}`;
}
