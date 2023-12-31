import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";

export const convertAdapterWithCalendar = (calendar) => {
  switch (calendar) {
    case "gregorian":
      return AdapterDateFns;
    case "jalali":
      return AdapterDateFnsJalali;
  }
};
