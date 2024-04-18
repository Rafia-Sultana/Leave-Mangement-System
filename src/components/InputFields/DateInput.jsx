import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
const DateInput = ({label,handleDateChange,value,disableDates}) => {
    return (
        
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={label.replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
                  onChange={
                    (date) =>
                     handleDateChange(date, label)}
                  sx={{ width: "100%" }}
                  value={value}
              
               shouldDisableDate={disableDates}
                
                />
              </LocalizationProvider>
        
    );
};

export default DateInput;