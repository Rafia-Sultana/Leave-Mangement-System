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

 export const startTimeArray = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
];
export const endTimeArray = [
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
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

 export  const convertToIsoString = (date, uptime) => {
  const [time, ampm] = uptime.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  const adjustHours = ampm == "PM" && hours !== 12 ? hours + 12 : hours;
  const date1 = new Date(date?.$d);
  date1.setHours(adjustHours, minutes, 0, 0);
  const timestamp = date1?.toISOString();
  return timestamp;
};

export   const getJoiningDate = (toDate) => {
  const tomorrowToDate = new Date(toDate);
  return FormateDate(
    new Date(tomorrowToDate.setDate(tomorrowToDate.getDate() + 1))
  );
};