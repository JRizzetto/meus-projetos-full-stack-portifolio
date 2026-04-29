"use client";
import { useState } from "react";

export default function Home() {
  const [isFunctionOpen, setIsFunctionOpen] = useState(false);
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const [isPricesOpen, setIsPricesOpen] = useState(false);

  const isAnyMenuOpen =
    isFunctionOpen || isSolutionOpen || isPlansOpen || isPricesOpen;

  const closeAllMenus = () => {
    setIsFunctionOpen(false);
    setIsSolutionOpen(false);
    setIsPlansOpen(false);
    setIsPricesOpen(false);
  };

  const openMenu = (menuToOpen: string) => {
    if (menuToOpen === "functions" && isFunctionOpen) {
      setIsFunctionOpen(false);
      return;
    }

    if (menuToOpen === "solution" && isSolutionOpen === true) {
      setIsSolutionOpen(false);
      return;
    }

    if (menuToOpen === "plans" && isPlansOpen === true) {
      setIsPlansOpen(false);
      return;
    }

    if (menuToOpen === "prices" && isPricesOpen === true) {
      setIsPricesOpen(false);
      return;
    }

    setIsFunctionOpen(menuToOpen === "functions");
    setIsSolutionOpen(menuToOpen === "solution");
    setIsPlansOpen(menuToOpen === "plans");
    setIsPricesOpen(menuToOpen === "prices");
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white transition: shadow duration-300 hover:shadow-lg relative z-10">
        {isAnyMenuOpen && (
          <div
            onClick={closeAllMenus}
            className="fixed inset-0 bg-black/50 z-20"
          ></div>
        )}

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">TaskFlow</h1>

          <div className="hidden lg:flex gap-10 font-bold text-gray-700">
            <button
              onClick={() => openMenu("functions")}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Functions
              <span className="ml-1 text-sm">{isFunctionOpen ? "▲" : "▼"}</span>
            </button>

            {isFunctionOpen && (
              <div className="border-b border-gray-200 bg-gray-50 absolute top-full z-30 w-[100vw] left-1/2 -translate-x-1/2 transition-all duration-500">
                <div className="mx-auto max-w-6xl px-6 py-4">
                  <div className="flex gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900">Inbox</h3>
                      <p className="text-sm font-normal">
                        Everything. In one place. Always. Your inbox collects
                        every mention, comment, deadline, and file update — then
                        intelligently sorts it all so you see what matters
                        first. No more chaos. No more missed follow-ups. Just
                        clarity.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Planner</h3>
                      <p className="text-sm font-normal">
                        Your calendar. Supercharged. Sync unlimited calendars,
                        block deep-focus sessions, and visually map your entire
                        week in seconds. See time conflicts before they happen.
                        Allocate hours to what actually moves the needle.
                        Planner doesn't just track time — it optimizes it.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Automation
                      </h3>
                      <p className="text-sm font-normal">
                        Set it once. Forget it forever. Automate repetitive
                        tasks, status changes, assignments, and notifications.
                        Create custom triggers like "when a task is overdue →
                        reassign + notify manager." Save hours every single week
                        without writing a single line of code.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => openMenu("solution")}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Solution
              <span className="ml-1 text-sm">{isSolutionOpen ? "▲" : "▼"}</span>
            </button>

            {isSolutionOpen && (
              <div className="border-b border-gray-200 bg-gray-50 absolute top-full z-30 w-[100vw] -translate-x-1/2 left-1/2">
                <div className="mx-auto max-w-6xl px-6 py-4">
                  <div className="flex gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Personal & Small Teams
                      </h3>
                      <p className="text-sm font-normal">
                        Perfect for freelancers, creators, and small teams.
                        Organize your daily tasks, track deadlines, and
                        collaborate without the noise. No complicated setup —
                        just simple, visual task management that works.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Remote Work
                      </h3>
                      <p className="text-sm font-normal">
                        Keep everyone aligned, no matter where they are. Assign
                        tasks, share updates, and monitor progress in real time.
                        Whether your team is across the table or across the
                        globe, stay connected and productive.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Project Management
                      </h3>
                      <p className="text-sm font-normal">
                        From idea to done — faster and cleaner. Break down big
                        goals into manageable tasks. Set priorities, track
                        status, and never drop the ball again. Perfect for
                        launching campaigns, products, or any team project.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => openMenu("plans")}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Plans
              <span className="ml-1 text-sm">{isPlansOpen ? "▲" : "▼"}</span>
            </button>

            {isPlansOpen && (
              <div className="border-b border-gray-200 bg-gray-50 absolute top-full z-30 w-[100vw] left-1/2 -translate-x-1/2">
                <div className="mx-auto max-w-6xl px-6 py-4">
                  <div className="flex gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900">Standard</h3>
                      <p className="text-sm font-normal">
                        For teams that need to manage more work and scale
                        collaboration.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Premium</h3>
                      <p className="text-sm font-normal">
                        Best for teams of up to 100 people who need to track
                        multiple projects and visualize work in multiple ways.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Enterprise
                      </h3>
                      <p className="text-sm font-normal">
                        Everything teams and enterprise administrators need to
                        manage projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => openMenu("prices")}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Prices
              <span className="ml-1 text-sm">{isPricesOpen ? "▲" : "▼"}</span>
            </button>

            {isPricesOpen && (
              <div className="border-b border-gray-200 bg-gray-50 absolute top-full z-30 w-[100vw] left-1/2 -translate-x-1/2">
                <div className="mx-auto max-w-6xl px-6 py-4">
                  <div className="flex gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900">FREE</h3>
                      <p className="text-sm font-normal">
                        $0 USD Free for up to 10 collaborators per workspace
                        Gather, organize, and accomplish your tasks.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">STANDARD</h3>
                      <p className="text-sm font-normal">
                        $5 USD Per user per month when billed annually ($6
                        billed monthly) Get more productive with card mirroring,
                        automation, and unlimited boards.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">PREMIUM</h3>
                      <p className="text-sm font-normal">
                        $10 USD Per user per month when billed annually ($12.50
                        billed monthly) Add AI to your boards and admin controls
                        to your toolkit. Plus, gain more perspective with
                        advanced views.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
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

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
              Productivity SaaS
            </span>

            <h2 className="text-4xl font-bold leading-tight md:text-5xl">
              Organize your tasks and focus on what matters{" "}
            </h2>

            <p className="text-lg text-gray-600">
              A simple and modern task manager to help you stay productive,
              manage priorities, and keep track of your daily work.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/register"
                className="rounded-lg bg-indigo-600 px-6 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Create Acount
              </a>

              <a
                href="/login"
                className="rounded-lg border border-gray-300 px-6 py-3 text-center font-medium text-gray-700 hover:bg-gray-200"
              >
                Login
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-bteween">
              <h3 className="text-lg font-semibold">Dashboard Preview</h3>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 ml-1">
                Active
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-200 p-4">
                <p className="text-sm text-gray-500">Total Task</p>
                <p className="mt-2 text-2xl font-bold">24</p>
              </div>

              <div className="rounded-xl bg-gray-200 p-4">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="mt-2 text-2xl font-bold">16</p>
              </div>

              <div className="rounded-xl bg-gray-200 p-4">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="mt-2 text-2xl font-bold">6</p>
              </div>

              <div className="rounded-xl bg-gray-200 p-4">
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="mt-2 text-2xl font-bold">2</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
              Features
            </span>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Everything you need to manage your work
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              TaskFlow helps you organize your day, track priorities, and keep
              your workflow clear.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Task Management
              </h3>
              <p className="mt-3 text-gray-600">
                Create, edit, complete, and organize your tasks with a clean and
                intuitive interface.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Smart Organization
              </h3>
              <p className="mt-3 text-gray-600 ">
                Filter tasks by status and priority so you can focus on what
                matters most.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Productivity Overview
              </h3>
              <p className="mt-3 text-gray-600 ">
                Get a quick summary of your progress with a simple dashboard
                built for daily use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="rounded-3xl bg-indigo-600 px-8 py-12 text-center text-white shadow-lg md:px-12">
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to organize your workflow?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
              Create your account and start managing your tasks with a modern
              and simple productivity tool.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/register"
                className="rounded-lg bg-white px-6 py-3 font-medium text-indigo-600 transition hover:bg-gray-200"
              >
                Get Started Free
              </a>
              <a
                href="/login"
                className="rounded-lg border border-indigo-300 px-6 py-3 font-medium text-white transition hover:bg-indigo-500"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
