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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* ステップインジケーター */}
      <div className="flex justify-center gap-3 pt-16 pb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 rounded-full transition-all duration-300 ${
              s <= step ? "w-8 bg-apple-blue" : "w-3"
            }`}
            style={s > step ? { backgroundColor: 'var(--color-fill)' } : undefined}
          />
        ))}
      </div>

      <div className="flex-1 px-6 pb-10">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="page-title">基本情報</h2>
              <p className="text-[15px] mt-1" style={{ color: 'var(--color-secondary-label)' }}>
                あなたの体格情報を教えてください
              </p>
            </div>

            <div>
              <label className="label">性別</label>
              <div className="flex gap-3">
                {(["male", "female"] as const).map((g) => (
                  <button
                    key={g}
                    className={`flex-1 py-3 rounded-apple font-semibold text-[15px] transition-all ${
                      gender === g
                        ? "bg-apple-blue text-white"
                        : ""
                    }`}
                    style={gender !== g ? { backgroundColor: 'var(--color-fill)', color: 'var(--color-secondary-label)' } : undefined}
                    onClick={() => setGender(g)}
                  >
                    {g === "male" ? "男性" : "女性"}
                  </button>
                ))}
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
              className="btn-primary w-full mt-2"
              disabled={!canProceedStep1}
              onClick={() => setStep(2)}
            >
              次へ
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="page-title">目標設定</h2>
              <p className="text-[15px] mt-1" style={{ color: 'var(--color-secondary-label)' }}>
                目標体重と達成期限を設定しましょう
              </p>
            </div>

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

            <div className="flex gap-3 mt-2">
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
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="page-title">レース情報</h2>
              <p className="text-[15px] mt-1" style={{ color: 'var(--color-secondary-label)' }}>
                次のレースの情報を教えてください
              </p>
            </div>

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

            <div className="flex gap-3 mt-2">
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
