import { describe, it, expect } from "vitest";
import { calculateEMA, getWeightWithEMA, analyzeWeight } from "./weightAnalyzer";

describe("calculateEMA", () => {
  it("空配列は空を返す", () => {
    expect(calculateEMA([], 7)).toEqual([]);
  });

  it("単一値はそのまま返す", () => {
    expect(calculateEMA([70], 7)).toEqual([70]);
  });

  it("EMAを正しく計算する", () => {
    const values = [70, 69.8, 70.2, 69.5, 69.7];
    const result = calculateEMA(values, 7);

    expect(result).toHaveLength(5);
    expect(result[0]).toBe(70);
    // 2番目: 69.8 * 0.25 + 70 * 0.75 = 69.95
    expect(result[1]).toBeCloseTo(69.95, 1);
  });

  it("値が一定ならEMAも一定", () => {
    const values = [65, 65, 65, 65, 65];
    const result = calculateEMA(values, 7);

    result.forEach((v) => expect(v).toBe(65));
  });
});

describe("getWeightWithEMA", () => {
  it("日付順にソートしてEMAを付与する", () => {
    const entries = [
      { id: "2", date: "2026-03-16", weight: 69.8 },
      { id: "1", date: "2026-03-15", weight: 70.0 },
      { id: "3", date: "2026-03-17", weight: 70.2 },
    ];

    const result = getWeightWithEMA(entries);

    expect(result).toHaveLength(3);
    expect(result[0]!.date).toBe("2026-03-15");
    expect(result[0]!.weight).toBe(70.0);
    expect(result[0]!.ema).toBe(70.0);
  });
});

describe("analyzeWeight", () => {
  it("記録なしはnullを返す", () => {
    expect(analyzeWeight([], 60, "2026-06-01", "2026-03-15")).toBeNull();
  });

  it("体重分析結果を返す", () => {
    const entries = [
      { id: "1", date: "2026-03-10", weight: 70.0 },
      { id: "2", date: "2026-03-11", weight: 69.8 },
      { id: "3", date: "2026-03-12", weight: 69.5 },
      { id: "4", date: "2026-03-13", weight: 69.3 },
      { id: "5", date: "2026-03-14", weight: 69.0 },
    ];

    const result = analyzeWeight(entries, 65, "2026-06-01", "2026-03-15");

    expect(result).not.toBeNull();
    expect(result!.currentWeight).toBe(69.0);
    expect(result!.trend).toBe("decreasing");
    expect(result!.remainingKg).toBeGreaterThan(0);
    expect(result!.progressToGoal).toBeGreaterThan(0);
  });
});
