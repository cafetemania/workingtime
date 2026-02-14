import type { PhaseInfo } from "../../types";

interface RaceCountdownProps {
  readonly raceDate: string;
  readonly raceName: string;
  readonly phaseInfo: PhaseInfo | null;
}

export function RaceCountdown({ raceName, phaseInfo }: RaceCountdownProps) {
  if (!phaseInfo) return null;

  const { daysUntilRace, label, description } = phaseInfo;

  const countdownText =
    daysUntilRace > 0
      ? `あと ${daysUntilRace} 日`
      : daysUntilRace === 0
        ? "本日レース!"
        : `レース後 ${Math.abs(daysUntilRace)} 日`;

  return (
    <div className="card bg-gradient-to-r from-primary-600 to-primary-500 text-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-primary-100">{raceName}</p>
          <p className="text-3xl font-bold mt-1">{countdownText}</p>
        </div>
        <div className="bg-white/20 rounded-lg px-3 py-1">
          <p className="text-sm font-medium">{label}</p>
        </div>
      </div>
      <p className="text-sm text-primary-100 mt-2">{description}</p>
    </div>
  );
}
