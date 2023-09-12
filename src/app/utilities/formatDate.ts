export const formatDate = (hoursToSet: number, date?: Date) => {
  if (date)
    return new Date(new Date(date).setHours(hoursToSet, 0, 0, 0)).toString();
  return new Date(new Date().setHours(hoursToSet, 0, 0, 0)).toString();
};
