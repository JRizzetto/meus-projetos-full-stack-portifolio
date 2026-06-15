import { GoalsList } from "@/components/dashboard/goals/GoalsList";
import { GoalForm } from "@/components/dashboard/goals/GoalForm";

export default function GoalsPage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white">Financial Goals</h1>

        <p className="mt-2 text-zinc-400">Track your savings progress.</p>
      </div>

      <GoalForm />
      <GoalsList />
    </section>
  );
}
