export function calculateStreak(completions: { date: Date }[]) {
  let streak = 0;

  const completedDates = new Set(
    completions.map((completion) => {
      const date = new Date(completion.date);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    }),
  );

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  while (completedDates.has(currentDate.getTime())) {
    streak++;

    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}
