import { useState } from "react";
import { useAppData } from "../../hooks/useAppData";
import { getToday } from "../../utils/dateUtils";
import { HYDRATION_PRESETS } from "../../data/phaseConfig";

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
    <div className="animate-fade-in">
      <div className="px-5 pt-14 pb-2">
        <h1 className="large-title">水分</h1>
      </div>

      <div className="px-4 pb-6 space-y-4">
        {/* 円形プログレス */}
        <div className="card text-center">
          <div className="relative w-36 h-36 mx-auto mb-3">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#e5e5ea"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#5ac8fa"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(percent / 100) * 326.7} 326.7`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[36px] font-bold text-apple-teal tracking-tight">{totalMl}</p>
              <p className="text-[13px] text-apple-tertiaryLabel -mt-1">/ {goalMl} ml</p>
            </div>
          </div>
          <p className="text-[15px] text-apple-secondaryLabel">
            達成率 <span className="font-semibold text-apple-teal">{percent}%</span>
          </p>
        </div>

        {/* クイック追加 */}
        <div className="card">
          <p className="text-[13px] font-semibold text-apple-secondaryLabel mb-3">クイック追加</p>
          <div className="grid grid-cols-2 gap-2">
            {HYDRATION_PRESETS.map((preset) => (
              <button
                key={preset.label}
                className="bg-apple-gray6 rounded-apple px-3 py-3 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                onClick={() => handleQuickAdd(preset.amount, preset.label)}
              >
                <span className="text-[18px]">{preset.icon}</span>
                <div className="text-left">
                  <p className="text-[13px] font-medium">{preset.label}</p>
                  <p className="text-[11px] text-apple-tertiaryLabel">{preset.amount}ml</p>
                </div>
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

        {/* 記録一覧 */}
        <div className="card">
          <p className="text-[13px] font-semibold text-apple-secondaryLabel mb-2">今日の記録</p>
          {todayEntries.length === 0 ? (
            <p className="text-[15px] text-apple-tertiaryLabel text-center py-6">
              まだ記録がありません
            </p>
          ) : (
            <div>
              {[...todayEntries].reverse().map((entry) => (
                <div
                  key={entry.id}
                  className="flex justify-between items-center py-3"
                  style={{ boxShadow: "inset 0 -0.5px 0 0 rgba(60,60,67,0.12)" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[15px]">{entry.type}</span>
                    <span className="text-[13px] text-apple-tertiaryLabel tabular-nums">
                      {new Date(entry.timestamp).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-semibold tabular-nums">{entry.amount}ml</span>
                    <button
                      onClick={() => deleteHydrationEntry(entry.id)}
                      className="text-[13px] text-apple-red active:opacity-50"
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
