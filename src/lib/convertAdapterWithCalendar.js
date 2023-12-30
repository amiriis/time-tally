import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";

export const convertAdapterWithCalendar = (calendar) => {
  switch (calendar) {
    case "gregorian":
      return AdapterMoment;
    case "jalali":
      return AdapterMomentJalaali;
  }
};
