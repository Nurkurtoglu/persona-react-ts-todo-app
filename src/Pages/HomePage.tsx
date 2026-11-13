import React, { useState, useEffect } from "react";
import { ClipboardList } from "lucide-react";
import type { FilterType, PriorityLevel, Task } from "../Interfaces/Task";
import { TaskForm } from "../Components/TaskForm";
import { FilterBar } from "../Components/FilterBar";
import { TaskItem } from "../Components/TaskItem";

const STORAGE_KEY = "react_ts_todo_tasks_v1";

export const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: "1",
        title: "React + TypeScript Proje Kurulumunu Tamamla",
        description: "Components, Pages ve Interfaces klasör yapısını oluştur.",
        priority: "Yüksek",
        completed: true,
        createdAt: new Date().toLocaleDateString("tr-TR"),
      },
      {
        id: "2",
        title: "GitHub ve Netlify Dağıtımını Yap",
        description:
          "Projeyi public repoya yükle ve canlı linki teslim formuna ekle.",
        priority: "Orta",
        completed: false,
        createdAt: new Date().toLocaleDateString("tr-TR"),
      },
    ];
  });

  const [filter, setFilter] = useState<FilterType>("ALL");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // 1. EKLEME (Create)
  const handleAddTask = (
    title: string,
    description: string,
    priority: PriorityLevel,
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date().toLocaleDateString("tr-TR"),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // 2. GÜNCELLEME - Durum Değiştirme (Update)
  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // 3. GÜNCELLEME - İçerik Düzenleme (Update)
  const handleUpdateTask = (
    id: string,
    title: string,
    description: string,
    priority: PriorityLevel,
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description, priority } : task,
      ),
    );
  };

  // 4. SİLME (Delete)
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // 5. LİSTELEME VE FİLTRELEME (Read)
  const filteredTasks = tasks.filter((task) => {
    if (filter === "ACTIVE") return !task.completed;
    if (filter === "COMPLETED") return task.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-md">
            <ClipboardList className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Görev Yönetim Uygulaması
            </h1>
            <p className="text-sm text-slate-500">
              React, TypeScript & Tailwind CSS ile geliştirildi
            </p>
          </div>
        </header>

        <TaskForm onAddTask={handleAddTask} />

        <FilterBar
          currentFilter={filter}
          onFilterChange={setFilter}
          totalCount={tasks.length}
          completedCount={completedCount}
        />

        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 text-slate-500">
              Bu kategoride gösterilecek görev bulunamadı.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
