export function getDatesInMonth(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1); 
    const endDate = new Date(year, month, 0); 
  
    const dates = [];
  
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date)); 
    }
  
    return dates;
}

export function groupDatesPerWeek(dates) {
    // Function to group the dates by week starting from Sunday
    const groupedDates = dates.reduce((acc, date, idx) => {
      const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
      const lastWeek = acc[acc.length - 1];
      lastWeek[dayOfWeek] = date;  
      if (dayOfWeek === 6 && idx < dates.length - 1) {
        acc.push(Array(7).fill(null))
      }
      return acc;
    }, [Array(7).fill(null)] as (Date | null)[][]);
  

    return groupedDates;
  }



  export function getDateClasses(date, firstDate, lastDate, today) {
    if (date < firstDate || date > lastDate) {
      return 'calendar-day NO_CURRENT_MONTH';
    }
  
    const dayOfWeek = date.getDay();
    let className = 'calendar-day';
  
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      className += ' WEEKEND';
    }
  
    if (date.getTime() === today.getTime()) {
      className += ' TODAY';
    }
  
    return className;
  }
  