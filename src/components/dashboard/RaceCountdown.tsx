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
    <div className="rounded-apple-xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #007aff 0%, #5856d6 100%)",
      }}
    >
      <div className="px-5 py-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[13px] text-white/70 font-medium">{raceName}</p>
            <p className="text-[40px] font-bold text-white tracking-tight leading-tight mt-1">
              {countdownText}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
            <p className="text-[13px] font-semibold text-white">{label}</p>
          </div>
        </div>
        <p className="text-[13px] text-white/70 mt-2">{description}</p>
      </div>
    </div>
  );
}
