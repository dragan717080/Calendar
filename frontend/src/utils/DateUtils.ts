abstract class DateUtils {
  /**
   * Formats Date object to string.
   * 
   * @param {Date} date - Date to be formatted.
   * @returns {string} formattedDate
   */
  static formatDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
  }
}

export default DateUtils;
