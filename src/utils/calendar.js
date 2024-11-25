import dayjs from "dayjs";
export const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
    const firstDateOfmonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
    const arrayOfDates = [];

    //create prefix dates
    for (let i = 0; i < firstDateOfmonth.day(); i++) {
        arrayOfDates.push({
            date: firstDateOfmonth.day(i),
            isCurrentMonth: false,
            isPrefixDate: true,
            isDateOfPreviousMonth: true,
        });
    }

    //generate dates for the current month
    for (let i = firstDateOfmonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDates.push({
            date: firstDateOfmonth.date(i),
            isCurrentMonth: true,
            isPrefixDate: firstDateOfmonth.date(i).date() < dayjs().date() && firstDateOfmonth.date(i).month() === dayjs().month() && firstDateOfmonth.date(i).year() === dayjs().year(),
            today: firstDateOfmonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString(),
        });
    }

    const remaining = 42 - arrayOfDates.length;
    for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
        arrayOfDates.push({
            date: lastDateOfMonth.date(i),
            isCurrentMonth: false,
            isDateOfNextMonth: true,
        });
    }

    return arrayOfDates;
};
