"use client";

import { Goal } from "@/types/goal";
import { useEffect, useState } from "react";

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadGoals() {
    try {
      const response = await fetch("/api/goals");
      const data = await response.json();

      setGoals(data);
    } catch (error) {
      console.error("LOAD_GOALS_ERROR", error);
    } finally {
      setLoading(false);
    }
  }

  function removeGoal(id: string) {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  }

  function updateGoal(updatedGoal: Goal) {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)),
    );
  }

  function addGoal(newGoal: Goal) {
    setGoals((prevGoals) => [newGoal, ...prevGoals]);
  }

  useEffect(() => {
    loadGoals();
  }, []);

  return {
    goals,
    loading,
    loadGoals,
    removeGoal,
    updateGoal,
    addGoal,
  };
}
