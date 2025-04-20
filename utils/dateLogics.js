export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = Math.abs(now - date + 7 * 60 * 60 * 1000);
  
    const timeUnits = [
      { label: 'second', ms: 1000 },
      { label: 'minute', ms: 1000 * 60 },
      { label: 'hour', ms: 1000 * 60 * 60 },
      { label: 'day', ms: 1000 * 60 * 60 * 24 },
      { label: 'week', ms: 1000 * 60 * 60 * 24 * 7 },
    ];
  
    for (let i = 0; i < timeUnits.length; i++) {
      const current = timeUnits[i];
      const next = timeUnits[i + 1];
  
      const amount = Math.floor(diffMs / current.ms);
      const nextAmount = next ? Math.floor(diffMs / next.ms) : diffMonth(date, now);
  
      if (nextAmount < 1) {
        return `${amount} ${current.label}${amount !== 1 ? 's' : ''} ago`;
      }
    }
  
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  
function diffMonth(fromDate, toDate){
  const from = new Date(fromDate)
  const to = new Date(toDate)

  const yearDiff = to.getFullYear() - from.getFullYear()
  const monthDiff = to.getMonth() - from.getMonth()

  const totalMonth = yearDiff * 12 + monthDiff
  if(to.getDate() < from.getDate())
    return totalMonth !==0 ? totalMonth -1 : totalMonth 
  return totalMonth
}