import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


const DateInput = ({ label, handleDateChange, value, disableDates,variant="outlined",required=true}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())}
        onChange={(date) => handleDateChange(date, label)}

        sx={{ width: "100%" }}

        value={value}
   
        shouldDisableDate={disableDates}
        
        slotProps={{ textField: { variant: variant ,required:required} }}
        
      />
    </LocalizationProvider>
  );
};

export default DateInput;
