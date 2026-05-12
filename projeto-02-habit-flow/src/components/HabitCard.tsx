import CompleteHabitButton from "./CompleteHabitButton";
import DeleteHabitButton from "./DeleteHabitButton";
import EditHabitForm from "./EditHabitForm";

type HabitCardProps = {
  habit: {
    id: string;
    title: string;
    description: string | null;
    color: string | null;
    completions: {
      date: Date;
    }[];
  };
  isCompletedToday: boolean;
  currentStreak: number;
  bestStreak: number;
};

export default function HabitCard({
  habit,
  isCompletedToday,
  currentStreak,
  bestStreak,
}: HabitCardProps) {
  const colorClasses = {
    indigo: "bg-indigo-600",
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-500",
  };

  const colorClassesFinished = {
    indigo: "bg-indigo-100",
    green: "bg-green-100",
    red: "bg-red-100",
    yellow: "bg-yellow-100",
  };

  const habitColor =
    colorClasses[habit.color as keyof typeof colorClasses] ?? "bg-indigo-600";

  colorClassesFinished[habit.color as keyof typeof colorClassesFinished] ??
    "bg-slate-100";

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${habitColor}`} />
            <h2 className="text-lg font-semibold text-slate-900">
              {habit.title}
            </h2>
          </div>

          {habit.description && (
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {habit.description}
            </p>
          )}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${isCompletedToday ? colorClassesFinished : "bg-slate-100 text-slate-600"}`}
        >
          {isCompletedToday ? "Done today" : "Pending"}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-100 p-3">
          <p className="text-xs text-slate-500">Current streak</p>
          <strong className="text-lg text-slate-900">
            {currentStreak} days
          </strong>
        </div>

        <div className="rounded-xl bg-slate-100 p-3">
          <p className="text-xs text-slate-500">Best streak</p>
          <strong className="text-ls text-slate-900">{bestStreak} days</strong>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <CompleteHabitButton
          habitId={habit.id}
          isCompletedToday={isCompletedToday}
        />

        <EditHabitForm
          habitId={habit.id}
          initialTitle={habit.title}
          initialDescription={habit.description}
          initialColor={habit.color}
        />

        <DeleteHabitButton habitId={habit.id} />
      </div>
    </div>
  );
}
