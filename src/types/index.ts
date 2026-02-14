/** アクティビティレベル */
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";

/** 性別 */
export type Gender = "male" | "female";

/** 食事タイプ */
export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

/** トレーニングフェーズ */
export type TrainingPhase =
  | "NORMAL"
  | "TAPER"
  | "CARBO_LOAD"
  | "RACE_WEEK"
  | "RACE_DAY"
  | "RECOVERY";

/** ユーザープロフィール */
export interface UserProfile {
  readonly targetWeight: number;
  readonly targetDate: string;
  readonly raceDate: string;
  readonly raceName: string;
  readonly currentWeight: number;
  readonly height: number;
  readonly age: number;
  readonly gender: Gender;
  readonly activityLevel: ActivityLevel;
}

/** 体重記録 */
export interface WeightEntry {
  readonly id: string;
  readonly date: string;
  readonly weight: number;
  readonly note?: string;
}

/** 栄養素 */
export interface Nutrients {
  readonly energy: number;
  readonly protein: number;
  readonly fat: number;
  readonly carbohydrate: number;
}

/** 食事アイテム */
export interface MealItem {
  readonly foodId: string;
  readonly foodName: string;
  readonly amount: number;
  readonly nutrients: Nutrients;
}

/** 食事記録 */
export interface MealEntry {
  readonly id: string;
  readonly date: string;
  readonly mealType: MealType;
  readonly items: readonly MealItem[];
}

/** 水分記録 */
export interface HydrationEntry {
  readonly id: string;
  readonly date: string;
  readonly amount: number;
  readonly type: string;
  readonly timestamp: string;
}

/** お気に入りメニュー */
export interface FavoriteMenu {
  readonly id: string;
  readonly name: string;
  readonly items: readonly MealItem[];
}

/** アプリ設定 */
export interface AppSettings {
  readonly dailyHydrationGoal: number;
  readonly enableNotifications: boolean;
}

/** アプリ全体のデータ */
export interface AppData {
  readonly version: number;
  readonly profile: UserProfile | null;
  readonly weightEntries: readonly WeightEntry[];
  readonly mealEntries: readonly MealEntry[];
  readonly hydrationEntries: readonly HydrationEntry[];
  readonly favorites: readonly FavoriteMenu[];
  readonly settings: AppSettings;
}

/** フェーズ別PFC設定（g/kg体重） */
export interface PhasePfcConfig {
  readonly protein: number;
  readonly fat: number;
  readonly carbohydrate: number;
}

/** フェーズ情報 */
export interface PhaseInfo {
  readonly phase: TrainingPhase;
  readonly daysUntilRace: number;
  readonly label: string;
  readonly description: string;
  readonly pfcConfig: PhasePfcConfig;
}

/** PFC目標（絶対値 g） */
export interface PfcTarget {
  readonly protein: number;
  readonly fat: number;
  readonly carbohydrate: number;
  readonly totalCalories: number;
}

/** 日次PFC実績 */
export interface DailyPfcSummary {
  readonly date: string;
  readonly actual: Nutrients;
  readonly target: PfcTarget;
  readonly achievementRate: {
    readonly protein: number;
    readonly fat: number;
    readonly carbohydrate: number;
  };
}

/** 食品データベースのエントリ */
export interface FoodItem {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly per100g: Nutrients;
}

/** 体重分析結果 */
export interface WeightAnalysis {
  readonly currentWeight: number;
  readonly movingAverage: number;
  readonly trend: "decreasing" | "stable" | "increasing";
  readonly progressToGoal: number;
  readonly remainingKg: number;
  readonly dailyChangeNeeded: number;
}
