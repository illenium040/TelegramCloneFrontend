

export const getDateString = (dbDate: Date) => {
    var date = new Date(dbDate);
    return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
}