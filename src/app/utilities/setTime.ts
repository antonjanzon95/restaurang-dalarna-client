export const setTime = (hoursToSet: number, newDate?: string) => {
  if (newDate) return new Date(new Date(newDate).setHours(hoursToSet, 0, 0, 0)).toString() 
  return new Date(new Date().setHours(hoursToSet, 0, 0, 0)).toString()
};