import moment from "moment";

export const formatCurrency = (value: number) => "" + value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

// Uses moment.js to format a date string
// If long is true, the date is formatted as "9th September 2021"
export const formatDate = (date: string, long = true) => {
    return long ? moment(date).format('Do MMMM YYYY') : moment(date).format('DD/MM/YYYY');
};