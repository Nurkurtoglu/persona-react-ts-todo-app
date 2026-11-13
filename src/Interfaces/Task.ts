export type PriorityLevel = "Düşük" | "Orta" | "Yüksek";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: PriorityLevel;
  completed: boolean;
  createdAt: string;
}

export type FilterType = "ALL" | "ACTIVE" | "COMPLETED";
