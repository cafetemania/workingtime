import { useState } from "react";
import { useAppData } from "../../hooks/useAppData";
import { getToday, formatDateShort } from "../../utils/dateUtils";
import { getWeightWithEMA } from "../../services/weightAnalyzer";
import { WeightChart } from "./WeightChart";

export function WeightPage() {
  const { data, addWeightEntry, deleteWeightEntry } = useAppData();
  const [weightInput, setWeightInput] = useState("");
  const today = getToday();
  const todayEntry = data.weightEntries.find((e) => e.date === today);
  const weightWithEma = getWeightWithEMA(data.weightEntries);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(weightInput);
    if (isNaN(weight) || weight < 20 || weight > 300) return;
    addWeightEntry(weight);
    setWeightInput("");
  };

  const recentEntries = [...data.weightEntries]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10);

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-14 pb-2">
        <h1 className="large-title">体重</h1>
      </div>

      <div className="px-4 pb-6 space-y-4">
        {/* 体重入力 */}
        <div className="card">
          <p className="text-[13px] font-semibold mb-3" style={{ color: 'var(--color-secondary-label)' }}>
            {todayEntry ? "今日の体重" : "今朝の体重を入力"}
          </p>
          {todayEntry ? (
            <div className="text-center py-2">
              <p className="text-[48px] font-bold text-apple-blue tracking-tight">
                {todayEntry.weight}
              </p>
              <p className="text-[15px] -mt-1" style={{ color: 'var(--color-tertiary-label)' }}>kg</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="number"
                className="input-field flex-1"
                placeholder="65.0"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                step={0.1}
                min={20}
                max={300}
              />
              <button type="submit" className="btn-primary" disabled={!weightInput}>
                記録
              </button>
            </form>
          )}
        </div>

        {/* チャート */}
        {weightWithEma.length > 1 && (
          <div className="card">
            <p className="text-[13px] font-semibold mb-3" style={{ color: 'var(--color-secondary-label)' }}>推移</p>
            <WeightChart data={weightWithEma} targetWeight={data.profile?.targetWeight} />
          </div>
        )}

        {/* 履歴 */}
        <div className="card">
          <p className="text-[13px] font-semibold mb-3" style={{ color: 'var(--color-secondary-label)' }}>履歴</p>
          {recentEntries.length === 0 ? (
            <p className="text-[15px] text-center py-6" style={{ color: 'var(--color-tertiary-label)' }}>
              まだ記録がありません
            </p>
          ) : (
            <div>
              {recentEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex justify-between items-center py-3"
                  style={{ boxShadow: "inset 0 -0.5px 0 0 var(--color-separator)" }}
                >
                  <span className="text-[15px]" style={{ color: 'var(--color-secondary-label)' }}>
                    {formatDateShort(entry.date)}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-[17px] font-semibold tabular-nums">{entry.weight} kg</span>
                    <button
                      onClick={() => deleteWeightEntry(entry.id)}
                      className="text-[15px] text-apple-red active:opacity-50"
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
