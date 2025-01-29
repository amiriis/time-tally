export const convertLocaleMomentWithCalendar = (calendar) => {
    switch (calendar) {
        case "gregorian":
            return "en";
        case "jalali":
            return "fa";
    }
};
