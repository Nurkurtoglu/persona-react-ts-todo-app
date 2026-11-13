import React, { useState } from "react";
import { CheckCircle2, Circle, Edit3, Trash2, Save, X } from "lucide-react";
import type { PriorityLevel, Task } from "../Interfaces/Task";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    title: string,
    description: string,
    priority: PriorityLevel,
  ) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);
  const [editPriority, setEditPriority] = useState<PriorityLevel>(
    task.priority,
  );

  const priorityColors: Record<PriorityLevel, string> = {
    Düşük: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Orta: "bg-amber-100 text-amber-700 border-amber-200",
    Yüksek: "bg-rose-100 text-rose-700 border-rose-200",
  };

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(task.id, editTitle.trim(), editDesc.trim(), editPriority);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as PriorityLevel)}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
          >
            <option value="Düşük">Düşük</option>
            <option value="Orta">Orta</option>
            <option value="Yüksek">Yüksek</option>
          </select>
        </div>
        <input
          type="text"
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          placeholder="Açıklama..."
          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 text-sm"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" /> İptal
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" /> Kaydet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-all ${
        task.completed
          ? "bg-slate-50 border-slate-200 opacity-75"
          : "bg-white border-slate-200 shadow-sm hover:border-indigo-300"
      }`}
    >
      <div className="flex items-start gap-3 flex-1">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="mt-0.5 text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
          title={
            task.completed
              ? "Tamamlanmadı olarak işaretle"
              : "Tamamlandı olarak işaretle"
          }
        >
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          ) : (
            <Circle className="w-6 h-6 text-slate-400" />
          )}
        </button>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-semibold text-base ${
                task.completed
                  ? "line-through text-slate-400"
                  : "text-slate-800"
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${priorityColors[task.priority]}`}
            >
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p
              className={`text-sm ${task.completed ? "text-slate-400" : "text-slate-600"}`}
            >
              {task.description}
            </p>
          )}

          <p className="text-xs text-slate-400 pt-1">
            Oluşturulma: {task.createdAt}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
          title="Düzenle"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          title="Sil"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
