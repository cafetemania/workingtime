import type { TrainingPhase, PhaseInfo } from "../types";
import { PHASE_PFC_CONFIG, PHASE_LABELS, PHASE_DESCRIPTIONS } from "../data/phaseConfig";
import { daysBetween, getToday } from "../utils/dateUtils";

/** レースまでの残日数からトレーニングフェーズを判定する */
export function determinePhase(daysUntilRace: number): TrainingPhase {
  if (daysUntilRace < -3) return "NORMAL";
  if (daysUntilRace < 0) return "RECOVERY";
  if (daysUntilRace === 0) return "RACE_DAY";
  if (daysUntilRace <= 2) return "RACE_WEEK";
  if (daysUntilRace <= 7) return "CARBO_LOAD";
  if (daysUntilRace <= 28) return "TAPER";
  return "NORMAL";
}

/** レース日からフェーズ情報を取得する */
export function getPhaseInfo(raceDate: string, today?: string): PhaseInfo {
  const currentDate = today ?? getToday();
  const daysUntilRace = daysBetween(currentDate, raceDate);
  const phase = determinePhase(daysUntilRace);

  return {
    phase,
    daysUntilRace,
    label: PHASE_LABELS[phase],
    description: PHASE_DESCRIPTIONS[phase],
    pfcConfig: PHASE_PFC_CONFIG[phase],
  };
}
