export function calculateBestStreak(completions: { date: Date }[]) {
  if (completions.length === 0) {
    return 0;
  }

  const timestamps = completions
    .map((completion) => {
      const date = new Date(completion.date);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    })
    .sort((a, b) => a - b);

  let bestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < timestamps.length; i++) {
    const previousDate = new Date(timestamps[i - 1]);
    const currentDate = new Date(timestamps[i]);

    previousDate.setDate(previousDate.getDate() + 1);

    if (previousDate.getTime() === currentDate.getTime()) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return bestStreak;
}
