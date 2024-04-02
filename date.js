const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dateToLabel(date) {
  const today = new Date();
  const yesterday = new Date(today - 86400000);
  const tomorrow = new Date(+today + 86400000);
  const dateStr = date.toDateString();
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dateNum = date.getDate();
  const name = dateStr == today.toDateString() ? 'today, ' 
    : dateStr == yesterday.toDateString() ? 'yesterday, ' 
    : dateStr == tomorrow.toDateString() ? 'tomorrow, ' : '';
  
  return `${name}${day}, ${month} ${dateNum}`;
}
