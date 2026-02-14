import { Header } from "../layout/Header";
import { useAppData } from "../../hooks/useAppData";
import { getToday } from "../../utils/dateUtils";
import { HYDRATION_PRESETS } from "../../data/phaseConfig";
import { useState } from "react";

export function HydrationPage() {
  const { data, addHydrationEntry, deleteHydrationEntry } = useAppData();
  const [customAmount, setCustomAmount] = useState("");
  const today = getToday();

  const todayEntries = data.hydrationEntries.filter((e) => e.date === today);
  const totalMl = todayEntries.reduce((sum, e) => sum + e.amount, 0);
  const goalMl = data.settings.dailyHydrationGoal;
  const percent = Math.min(100, Math.round((totalMl / goalMl) * 100));

  const handleQuickAdd = (amount: number, label: string) => {
    addHydrationEntry(amount, label);
  };

  const handleCustomAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(customAmount);
    if (isNaN(amount) || amount < 1) return;
    addHydrationEntry(amount, "カスタム");
    setCustomAmount("");
  };

  return (
    <div>
      <Header title="水分記録" />
      <div className="px-4 py-4 space-y-4">
        {/* 進捗 */}
        <div className="card text-center">
          <div className="relative w-32 h-32 mx-auto mb-3">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(percent / 100) * 339.3} 339.3`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-primary-600">{totalMl}</p>
              <p className="text-xs text-slate-400">/ {goalMl} ml</p>
            </div>
          </div>
          <p className="text-sm text-slate-500">達成率 {percent}%</p>
        </div>

        {/* プリセットボタン */}
        <div className="card">
          <h3 className="text-sm font-medium text-slate-500 mb-3">クイック追加</h3>
          <div className="grid grid-cols-2 gap-2">
            {HYDRATION_PRESETS.map((preset) => (
              <button
                key={preset.label}
                className="btn-secondary text-sm py-3 flex items-center justify-center gap-2"
                onClick={() => handleQuickAdd(preset.amount, preset.label)}
              >
                <span>{preset.icon}</span>
                <span>{preset.label} ({preset.amount}ml)</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleCustomAdd} className="flex gap-2 mt-3">
            <input
              type="number"
              className="input-field flex-1"
              placeholder="量 (ml)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              min={1}
              max={5000}
            />
            <button type="submit" className="btn-primary" disabled={!customAmount}>
              追加
            </button>
          </form>
        </div>

        {/* 今日の記録 */}
        <div className="card">
          <h3 className="text-sm font-medium text-slate-500 mb-2">今日の記録</h3>
          {todayEntries.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">まだ記録がありません</p>
          ) : (
            <div className="space-y-1">
              {[...todayEntries].reverse().map((entry) => (
                <div key={entry.id} className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{entry.type}</span>
                    <span className="text-xs text-slate-400">
                      {new Date(entry.timestamp).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{entry.amount}ml</span>
                    <button
                      onClick={() => deleteHydrationEntry(entry.id)}
                      className="text-xs text-red-400"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
