import { describe, it, expect } from "vitest";
import { determinePhase, getPhaseInfo } from "./phaseCalculator";

describe("determinePhase", () => {
  it("28日超はNORMAL", () => {
    expect(determinePhase(30)).toBe("NORMAL");
    expect(determinePhase(100)).toBe("NORMAL");
  });

  it("8-28日はTAPER", () => {
    expect(determinePhase(28)).toBe("TAPER");
    expect(determinePhase(14)).toBe("TAPER");
    expect(determinePhase(8)).toBe("TAPER");
  });

  it("3-7日はCARBO_LOAD", () => {
    expect(determinePhase(7)).toBe("CARBO_LOAD");
    expect(determinePhase(3)).toBe("CARBO_LOAD");
  });

  it("1-2日はRACE_WEEK", () => {
    expect(determinePhase(2)).toBe("RACE_WEEK");
    expect(determinePhase(1)).toBe("RACE_WEEK");
  });

  it("0日はRACE_DAY", () => {
    expect(determinePhase(0)).toBe("RACE_DAY");
  });

  it("-1〜-3日はRECOVERY", () => {
    expect(determinePhase(-1)).toBe("RECOVERY");
    expect(determinePhase(-3)).toBe("RECOVERY");
  });

  it("-4日以降はNORMAL", () => {
    expect(determinePhase(-4)).toBe("NORMAL");
    expect(determinePhase(-10)).toBe("NORMAL");
  });
});

describe("getPhaseInfo", () => {
  it("レース日から正しいフェーズ情報を返す", () => {
    const result = getPhaseInfo("2026-03-15", "2026-03-15");
    expect(result.phase).toBe("RACE_DAY");
    expect(result.daysUntilRace).toBe(0);
    expect(result.label).toBe("レース当日");
  });

  it("30日前はNORMALフェーズ", () => {
    const result = getPhaseInfo("2026-04-15", "2026-03-15");
    expect(result.phase).toBe("NORMAL");
    expect(result.daysUntilRace).toBe(31);
  });

  it("5日前はCARBO_LOADフェーズ", () => {
    const result = getPhaseInfo("2026-03-20", "2026-03-15");
    expect(result.phase).toBe("CARBO_LOAD");
    expect(result.daysUntilRace).toBe(5);
  });

  it("PFC設定が正しく含まれる", () => {
    const result = getPhaseInfo("2026-03-20", "2026-03-15");
    expect(result.pfcConfig).toEqual({ protein: 1.2, fat: 0.5, carbohydrate: 9 });
  });
});
