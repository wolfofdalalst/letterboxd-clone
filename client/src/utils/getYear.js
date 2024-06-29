/**
 * Function that takes the entire date and only returns the year 
 * @param {string} fullDate 
 * @returns number
 */
const getYear = (fullDate) => new Date(fullDate).getFullYear();

export default getYear;
