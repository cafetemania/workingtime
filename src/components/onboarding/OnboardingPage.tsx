import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../../hooks/useAppData";
import type { UserProfile, Gender, ActivityLevel } from "../../types";

type Step = 1 | 2 | 3;

const ACTIVITY_LEVELS: Array<{ value: ActivityLevel; label: string }> = [
  { value: "sedentary", label: "座り仕事中心" },
  { value: "light", label: "軽い運動あり" },
  { value: "moderate", label: "週3-4日運動" },
  { value: "active", label: "週5-6日運動" },
  { value: "very_active", label: "毎日ハードなトレーニング" },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const { setProfile, addWeightEntry } = useAppData();
  const [step, setStep] = useState<Step>(1);

  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");

  const [targetWeight, setTargetWeight] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const [raceName, setRaceName] = useState("");
  const [raceDate, setRaceDate] = useState("");

  const canProceedStep1 = age && height && currentWeight;
  const canProceedStep2 = targetWeight && targetDate;
  const canFinish = raceName && raceDate;

  const handleFinish = () => {
    const profile: UserProfile = {
      gender,
      age: Number(age),
      height: Number(height),
      currentWeight: Number(currentWeight),
      activityLevel,
      targetWeight: Number(targetWeight),
      targetDate,
      raceName,
      raceDate,
    };
    setProfile(profile);
    addWeightEntry(Number(currentWeight));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-primary-600 flex flex-col">
      {/* ステップインジケーター */}
      <div className="flex justify-center gap-2 pt-8 pb-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-3 h-3 rounded-full transition-colors ${
              s <= step ? "bg-white" : "bg-primary-400"
            }`}
          />
        ))}
      </div>

      <div className="flex-1 bg-white rounded-t-3xl px-6 pt-8 pb-6">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-slate-800">基本情報</h2>
            <p className="text-sm text-slate-500">あなたの体格情報を教えてください</p>

            <div>
              <label className="label">性別</label>
              <div className="flex gap-3">
                <button
                  className={`flex-1 py-2 rounded-lg border-2 font-medium transition-colors ${
                    gender === "male"
                      ? "border-primary-600 bg-primary-50 text-primary-600"
                      : "border-slate-200 text-slate-500"
                  }`}
                  onClick={() => setGender("male")}
                >
                  男性
                </button>
                <button
                  className={`flex-1 py-2 rounded-lg border-2 font-medium transition-colors ${
                    gender === "female"
                      ? "border-primary-600 bg-primary-50 text-primary-600"
                      : "border-slate-200 text-slate-500"
                  }`}
                  onClick={() => setGender("female")}
                >
                  女性
                </button>
              </div>
            </div>

            <div>
              <label className="label">年齢</label>
              <input
                type="number"
                className="input-field"
                placeholder="30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min={10}
                max={120}
              />
            </div>

            <div>
              <label className="label">身長 (cm)</label>
              <input
                type="number"
                className="input-field"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min={100}
                max={250}
              />
            </div>

            <div>
              <label className="label">現在の体重 (kg)</label>
              <input
                type="number"
                className="input-field"
                placeholder="65.0"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                step={0.1}
                min={20}
                max={300}
              />
            </div>

            <div>
              <label className="label">活動レベル</label>
              <select
                className="input-field"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              >
                {ACTIVITY_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn-primary w-full mt-4"
              disabled={!canProceedStep1}
              onClick={() => setStep(2)}
            >
              次へ
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-slate-800">目標設定</h2>
            <p className="text-sm text-slate-500">目標体重と達成期限を設定しましょう</p>

            <div>
              <label className="label">目標体重 (kg)</label>
              <input
                type="number"
                className="input-field"
                placeholder="60.0"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                step={0.1}
                min={20}
                max={300}
              />
            </div>

            <div>
              <label className="label">目標達成期限</label>
              <input
                type="date"
                className="input-field"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button className="btn-secondary flex-1" onClick={() => setStep(1)}>
                戻る
              </button>
              <button
                className="btn-primary flex-1"
                disabled={!canProceedStep2}
                onClick={() => setStep(3)}
              >
                次へ
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-slate-800">レース情報</h2>
            <p className="text-sm text-slate-500">次のレースの情報を教えてください</p>

            <div>
              <label className="label">レース名</label>
              <input
                type="text"
                className="input-field"
                placeholder="東京マラソン 2026"
                value={raceName}
                onChange={(e) => setRaceName(e.target.value)}
              />
            </div>

            <div>
              <label className="label">レース日</label>
              <input
                type="date"
                className="input-field"
                value={raceDate}
                onChange={(e) => setRaceDate(e.target.value)}
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button className="btn-secondary flex-1" onClick={() => setStep(2)}>
                戻る
              </button>
              <button
                className="btn-primary flex-1"
                disabled={!canFinish}
                onClick={handleFinish}
              >
                はじめる
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
