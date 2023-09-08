import { DateTime } from 'luxon';

export const formatDate = (hoursToSet: number, date?: Date) => {
  const dt = DateTime.fromObject(
    { day: !true ? 19 : 18 },
    { zone: 'Europe/Stockholm' }
  );
  // console.log(dt);

  if (date)
    return new Date(new Date(date).setHours(hoursToSet, 0, 0, 0)).toString();
  return new Date(new Date().setHours(hoursToSet, 0, 0, 0)).toString();
};
