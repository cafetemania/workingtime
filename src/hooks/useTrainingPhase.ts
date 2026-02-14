import { useMemo } from "react";
import type { PhaseInfo } from "../types";
import { getPhaseInfo } from "../services/phaseCalculator";

/** レース日からトレーニングフェーズ情報を取得するフック */
export function useTrainingPhase(raceDate: string | undefined): PhaseInfo | null {
  return useMemo(() => {
    if (!raceDate) return null;
    return getPhaseInfo(raceDate);
  }, [raceDate]);
}
