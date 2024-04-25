import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const DateInput = ({ label, handleDateChange, value, disableDates,variant="outlined" }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())}
        onChange={(date) => handleDateChange(date, label)}
        sx={{ width: "100%" }}
        value={value}
        // defaultValue={dayjs(new Date())}
        shouldDisableDate={disableDates}
        required={true}
        slotProps={{ textField: { variant: variant } }}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
