import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="animate-fade-in">
      <div className="px-5 pt-14 pb-2">
        <h1 className="large-title">設定</h1>
      </div>

      <div className="px-4 pb-6 space-y-5">
        {/* プロフィール */}
        {data.profile && (
          <div>
            <p className="section-header">プロフィール</p>
            <div className="card !p-0 overflow-hidden">
              {[
                { label: "レース", value: data.profile.raceName },
                { label: "レース日", value: data.profile.raceDate },
                { label: "目標体重", value: `${data.profile.targetWeight} kg` },
                { label: "身長", value: `${data.profile.height} cm` },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center px-4 py-3"
                  style={idx < 3 ? { boxShadow: "inset 0 -0.5px 0 0 rgba(60,60,67,0.12)" } : undefined}
                >
                  <span className="text-[15px] text-apple-label">{item.label}</span>
                  <span className="text-[15px] text-apple-secondaryLabel">{item.value}</span>
                </div>
              ))}
            </div>
            <button
              className="w-full text-[15px] text-apple-blue font-medium text-center py-3 mt-2 active:opacity-50"
              onClick={() => navigate("/onboarding")}
            >
              プロフィールを編集
            </button>
          </div>
        )}

        {/* 目標設定 */}
        <div>
          <p className="section-header">目標</p>
          <div className="card">
            <label className="text-[13px] text-apple-secondaryLabel font-medium">
              1日の水分目標 (ml)
            </label>
            <input
              type="number"
              className="input-field mt-2"
              value={data.settings.dailyHydrationGoal}
              onChange={handleHydrationGoalChange}
              min={500}
              max={10000}
              step={100}
            />
          </div>
        </div>

        {/* データ管理 */}
        <div>
          <p className="section-header">データ管理</p>
          <div className="card space-y-3">
            <button
              className="btn-primary w-full"
              onClick={handleExport}
            >
              データをエクスポート
            </button>

            <label className="btn-secondary w-full block text-center cursor-pointer">
              データをインポート
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImport}
              />
            </label>

            {importSuccess && (
              <div className="bg-apple-green/10 rounded-apple px-4 py-2">
                <p className="text-[13px] text-apple-green font-medium text-center">
                  インポートが完了しました
                </p>
              </div>
            )}
            {importError && (
              <div className="bg-apple-red/10 rounded-apple px-4 py-2">
                <p className="text-[13px] text-apple-red font-medium text-center">{importError}</p>
              </div>
            )}
          </div>
        </div>

        {/* アプリ情報 */}
        <div>
          <p className="section-header">アプリ情報</p>
          <div className="card">
            <p className="text-[15px] text-apple-secondaryLabel">マラソン栄養管理 v0.1.0</p>
            <p className="text-[13px] text-apple-tertiaryLabel mt-1">
              データはブラウザのlocalStorageに保存されます
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
