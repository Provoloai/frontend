export const isSameDay = (d1: Date, d2: Date): boolean => 
  d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

export const parseFirestoreTimestamp = (ts: any): Date | null => {
  if (!ts) return null;
  if (ts.seconds) return new Date(ts.seconds * 1000);
  return new Date(ts); // fallback
};
