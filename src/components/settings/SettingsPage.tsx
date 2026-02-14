import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../layout/Header";
import { useAppData } from "../../hooks/useAppData";
import { downloadAsJson, importData } from "../../services/dataExporter";
import { loadAppData } from "../../services/storageService";

export function SettingsPage() {
  const { data, updateSettings, replaceData } = useAppData();
  const navigate = useNavigate();
  const [importError, setImportError] = useState("");
  const [importSuccess, setImportSuccess] = useState(false);

  const handleExport = () => {
    const date = new Date().toISOString().slice(0, 10);
    downloadAsJson(`marathon-nutrition-${date}.json`);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const result = importData(text);
      if (result.success) {
        setImportSuccess(true);
        setImportError("");
        replaceData(loadAppData());
        setTimeout(() => setImportSuccess(false), 3000);
      } else {
        setImportError(result.error ?? "インポートに失敗しました");
        setImportSuccess(false);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleHydrationGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) {
      updateSettings({ dailyHydrationGoal: val });
    }
  };

  return (
    <div>
      <Header title="設定" />
      <div className="px-4 py-4 space-y-4">
        {/* プロフィール */}
        {data.profile && (
          <div className="card">
            <h3 className="text-sm font-medium text-slate-500 mb-3">プロフィール</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">レース</span>
                <span>{data.profile.raceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">レース日</span>
                <span>{data.profile.raceDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">目標体重</span>
                <span>{data.profile.targetWeight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">身長</span>
                <span>{data.profile.height} cm</span>
              </div>
            </div>
            <button
              className="btn-secondary w-full mt-3 text-sm"
              onClick={() => navigate("/onboarding")}
            >
              プロフィールを編集
            </button>
          </div>
        )}

        {/* 目標設定 */}
        <div className="card">
          <h3 className="text-sm font-medium text-slate-500 mb-3">目標設定</h3>
          <div>
            <label className="label">1日の水分目標 (ml)</label>
            <input
              type="number"
              className="input-field"
              value={data.settings.dailyHydrationGoal}
              onChange={handleHydrationGoalChange}
              min={500}
              max={10000}
              step={100}
            />
          </div>
        </div>

        {/* データ管理 */}
        <div className="card">
          <h3 className="text-sm font-medium text-slate-500 mb-3">データ管理</h3>
          <div className="space-y-2">
            <button className="btn-primary w-full text-sm" onClick={handleExport}>
              データをエクスポート (JSON)
            </button>

            <label className="btn-secondary w-full text-sm block text-center cursor-pointer">
              データをインポート
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImport}
              />
            </label>
          </div>

          {importSuccess && (
            <p className="text-sm text-green-600 mt-2">インポートが完了しました</p>
          )}
          {importError && (
            <p className="text-sm text-red-600 mt-2">{importError}</p>
          )}
        </div>

        {/* アプリ情報 */}
        <div className="card">
          <h3 className="text-sm font-medium text-slate-500 mb-3">アプリ情報</h3>
          <div className="space-y-1 text-sm text-slate-500">
            <p>マラソン栄養管理 v0.1.0</p>
            <p>データはブラウザのlocalStorageに保存されます</p>
          </div>
        </div>
      </div>
    </div>
  );
}
