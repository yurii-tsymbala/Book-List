export default function getFormattedDate(time: number): string {
  if (time <= 0) {
    return '--';
  }

  const date = new Date(time);

  const day = date.getDate().toString();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hoursAndMinutes = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${day} ${month} ${year}, ${hoursAndMinutes}`;
}

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
