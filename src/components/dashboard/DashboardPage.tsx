import { useAppData } from "../../hooks/useAppData";
import { useTrainingPhase } from "../../hooks/useTrainingPhase";
import { RaceCountdown } from "./RaceCountdown";
import { DailyAdviceBanner } from "./DailyAdviceBanner";
import { DailySummary } from "./DailySummary";
import { MiniPfcRadar } from "./MiniPfcRadar";

export function DashboardPage() {
  const { data } = useAppData();
  const phaseInfo = useTrainingPhase(data.profile?.raceDate);

  if (!data.profile) return null;

  return (
    <div className="animate-fade-in">
      {/* iOS Large Title Header */}
      <div className="px-5 pt-14 pb-2">
        <p className="text-[13px]" style={{ color: 'var(--color-secondary-label)' }}>{data.profile.raceName}</p>
        <h1 className="large-title">ホーム</h1>
      </div>

      <div className="px-4 pb-6 space-y-4">
        <RaceCountdown
          raceDate={data.profile.raceDate}
          raceName={data.profile.raceName}
          phaseInfo={phaseInfo}
        />
        <DailyAdviceBanner
          phaseInfo={phaseInfo}
          mealEntries={data.mealEntries}
          hydrationEntries={data.hydrationEntries}
          hydrationGoal={data.settings.dailyHydrationGoal}
          weight={data.profile.currentWeight}
        />
        <div className="grid grid-cols-2 gap-3">
          <DailySummary
            weightEntries={data.weightEntries}
            mealEntries={data.mealEntries}
            hydrationEntries={data.hydrationEntries}
            hydrationGoal={data.settings.dailyHydrationGoal}
          />
          <MiniPfcRadar
            mealEntries={data.mealEntries}
            phaseInfo={phaseInfo}
            weight={data.profile.currentWeight}
          />
        </div>
      </div>
    </div>
  );
}
