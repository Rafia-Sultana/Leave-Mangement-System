 export default function FormateDate(date) {
    if(!date) return null;
    const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    // console.log(typeof formattedDate);
  return formattedDate;
}