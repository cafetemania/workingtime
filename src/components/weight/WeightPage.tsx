import { useState } from "react";
import { Header } from "../layout/Header";
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
    <div>
      <Header title="体重記録" />
      <div className="px-4 py-4 space-y-4">
        {/* 体重入力フォーム */}
        <div className="card">
          <h3 className="text-sm font-medium text-slate-500 mb-3">
            {todayEntry ? "今日の体重（記録済み）" : "今朝の体重を入力"}
          </h3>
          {todayEntry ? (
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">{todayEntry.weight} kg</p>
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

        {/* 体重グラフ */}
        {weightWithEma.length > 1 && (
          <div className="card">
            <h3 className="text-sm font-medium text-slate-500 mb-3">体重推移</h3>
            <WeightChart data={weightWithEma} targetWeight={data.profile?.targetWeight} />
          </div>
        )}

        {/* 最近の記録 */}
        <div className="card">
          <h3 className="text-sm font-medium text-slate-500 mb-3">最近の記録</h3>
          {recentEntries.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">まだ記録がありません</p>
          ) : (
            <div className="space-y-2">
              {recentEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
                >
                  <span className="text-sm text-slate-600">
                    {formatDateShort(entry.date)}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{entry.weight} kg</span>
                    <button
                      onClick={() => deleteWeightEntry(entry.id)}
                      className="text-xs text-red-400 hover:text-red-600"
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
