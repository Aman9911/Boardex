export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDays(date1: Date, date2: Date): number {
  const oneDayInMs = 1000 * 60 * 60 * 24;
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(diffInMs / oneDayInMs);
}
