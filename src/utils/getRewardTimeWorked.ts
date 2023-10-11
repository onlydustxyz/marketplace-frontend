export enum Units {
  Hours = "hours",
  Days = "days",
}

const HOURS_PER_DAY = 8;

export function getRewardTimeWorked(hoursWorked: number) {
  const time = hoursWorked >= HOURS_PER_DAY ? hoursWorked / HOURS_PER_DAY : hoursWorked;
  const unit = hoursWorked >= HOURS_PER_DAY ? Units.Days : Units.Hours;

  return { time, unit };
}
