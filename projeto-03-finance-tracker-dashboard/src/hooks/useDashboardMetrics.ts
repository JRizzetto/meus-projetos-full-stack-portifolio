"use client";

import { useEffect, useState } from "react";

interface DashboardMetrics {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
  savingsRate: number;
}

export function useDashboardMetrics() {
  const [metrics, setmetrics] = useState<DashboardMetrics | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();

        setmetrics(data);
      } catch (error) {
        console.error("LOAD_METRICS_ERROR", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMetrics();
  }, []);

  return {
    metrics,
    isLoading,
  };
}
