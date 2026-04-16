"use client";
import { useState } from "react";

export default function Home() {
  const [isFunctionOpen, setIsFunctionOpen] = useState(false);
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const [isPricesOpen, setIsPricesOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white transition: shadow duration-300 hover:shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">TaskFlow</h1>

          <div className="flex gap-10 font-bold">
            <button
              onClick={() => setIsFunctionOpen(!isFunctionOpen)}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Functions
              <span className="ml-1 text-sm">{isFunctionOpen ? "▲" : "▼"}</span>
            </button>

            <button
              onClick={() => setIsSolutionOpen(!isSolutionOpen)}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Solution
              <span className="ml-1 text-sm">{isSolutionOpen ? "▲" : "▼"}</span>
            </button>

            <button
              onClick={() => setIsPlansOpen(!isPlansOpen)}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Plans
              <span className="ml-1 text-sm">{isPlansOpen ? "▲" : "▼"}</span>
            </button>

            <button
              onClick={() => setIsPricesOpen(!isPricesOpen)}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Prices
              <span className="ml-1 text-sm">{isPricesOpen ? "▲" : "▼"}</span>
            </button>
          </div>

          <nav className="flex items-center gap-4">
            <a
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Login
            </a>

            <a
              href="/register"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Register
            </a>
          </nav>
        </div>
      </header>

      {isFunctionOpen && (
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex gap-8">
              <div>
                <h3 className="font-semibold text-gray-900">Inbox</h3>
                <p className="text-sm text-gray-600">
                  Everything. In one place. Always. Your inbox collects every
                  mention, comment, deadline, and file update — then
                  intelligently sorts it all so you see what matters first. No
                  more chaos. No more missed follow-ups. Just clarity.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Planner</h3>
                <p className="text-sm text-gray-600">
                  Your calendar. Supercharged. Sync unlimited calendars, block
                  deep-focus sessions, and visually map your entire week in
                  seconds. See time conflicts before they happen. Allocate hours
                  to what actually moves the needle. Planner doesn't just track
                  time — it optimizes it.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Automation</h3>
                <p className="text-sm text-gray-600">
                  Set it once. Forget it forever. Automate repetitive tasks,
                  status changes, assignments, and notifications. Create custom
                  triggers like "when a task is overdue → reassign + notify
                  manager." Save hours every single week without writing a
                  single line of code.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSolutionOpen && (
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex gap-8">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Personal & Small Teams
                </h3>
                <p className="text-sm text-gray-600">
                  Perfect for freelancers, creators, and small teams. Organize
                  your daily tasks, track deadlines, and collaborate without the
                  noise. No complicated setup — just simple, visual task
                  management that works.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Remote Work</h3>
                <p className="text-sm text-gray-600">
                  Keep everyone aligned, no matter where they are. Assign tasks,
                  share updates, and monitor progress in real time. Whether your
                  team is across the table or across the globe, stay connected
                  and productive.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Project Management
                </h3>
                <p className="text-sm text-gray-600">
                  From idea to done — faster and cleaner. Break down big goals
                  into manageable tasks. Set priorities, track status, and never
                  drop the ball again. Perfect for launching campaigns,
                  products, or any team project.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPlansOpen && (
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex gap-8">
              <div>
                <h3 className="font-semibold text-gray-900">Standard</h3>
                <p className="text-sm text-gray-600">
                  For teams that need to manage more work and scale
                  collaboration.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Premium</h3>
                <p className="text-sm text-gray-600">
                  Best for teams of up to 100 people who need to track multiple
                  projects and visualize work in multiple ways.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Enterprise</h3>
                <p className="text-sm text-gray-600">
                  Everything teams and enterprise administrators need to manage
                  projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPricesOpen && (
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex gap-8">
              <div>
                <h3 className="font-semibold text-gray-900">FREE</h3>
                <p className="text-sm text-gray-600">
                  $0 USD Free for up to 10 collaborators per workspace Gather,
                  organize, and accomplish your tasks.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">STANDARD</h3>
                <p className="text-sm text-gray-600">
                  $5 USD Per user per month when billed annually ($6 billed
                  monthly) Get more productive with card mirroring, automation,
                  and unlimited boards.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">PREMIUM</h3>
                <p className="text-sm text-gray-600">
                  $10 USD Per user per month when billed annually ($12.50 billed
                  monthly) Add AI to your boards and admin controls to your
                  toolkit. Plus, gain more perspective with advanced views.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
