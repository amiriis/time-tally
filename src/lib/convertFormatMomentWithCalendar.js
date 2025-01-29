export const convertFormatMomentWithCalendar = (year, month, day, seperator, calendar) => {
    switch (calendar) {
        case "gregorian":
            return `${year}${seperator}${month}${seperator}${day}`;
        case "jalali":
            return `j${year}${seperator}j${month}${seperator}j${day}`;
    }
};
