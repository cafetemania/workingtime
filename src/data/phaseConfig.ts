import type { TrainingPhase, PhasePfcConfig } from "../types";

/** フェーズ別PFC設定（g/kg体重） */
export const PHASE_PFC_CONFIG: Record<TrainingPhase, PhasePfcConfig> = {
  NORMAL: { protein: 1.5, fat: 1.0, carbohydrate: 6 },
  TAPER: { protein: 1.4, fat: 0.8, carbohydrate: 5.5 },
  CARBO_LOAD: { protein: 1.2, fat: 0.5, carbohydrate: 9 },
  RACE_WEEK: { protein: 1.0, fat: 0.5, carbohydrate: 8 },
  RACE_DAY: { protein: 1.0, fat: 0.5, carbohydrate: 8 },
  RECOVERY: { protein: 1.6, fat: 1.0, carbohydrate: 7 },
};

/** フェーズのラベル */
export const PHASE_LABELS: Record<TrainingPhase, string> = {
  NORMAL: "通常期",
  TAPER: "テーパリング",
  CARBO_LOAD: "カーボローディング",
  RACE_WEEK: "レース週",
  RACE_DAY: "レース当日",
  RECOVERY: "回復期",
};

/** フェーズの説明 */
export const PHASE_DESCRIPTIONS: Record<TrainingPhase, string> = {
  NORMAL: "バランスの良い食事で体づくりを進めましょう",
  TAPER: "練習量を減らしつつ、栄養バランスを維持しましょう",
  CARBO_LOAD: "炭水化物を増やしてグリコーゲンを蓄えましょう",
  RACE_WEEK: "消化の良い食事を心がけ、コンディションを整えましょう",
  RACE_DAY: "レース本番！ベストを尽くしましょう",
  RECOVERY: "たんぱく質を意識して、体の回復を促しましょう",
};

/** フェーズ別アドバイステンプレート */
export const PHASE_ADVICE: Record<TrainingPhase, readonly string[]> = {
  NORMAL: [
    "バランスの良い食事を3食しっかり摂りましょう",
    "たんぱく質は体重1kgあたり1.5gを目安に",
    "練習後30分以内にリカバリー食を摂りましょう",
    "鉄分・カルシウムの不足に注意しましょう",
  ],
  TAPER: [
    "練習量が減るため、摂取カロリーも少し控えめに",
    "良質な睡眠を心がけましょう",
    "水分摂取を意識的に行いましょう",
    "新しい食べ物は試さず、慣れた食事を",
  ],
  CARBO_LOAD: [
    "ご飯・パスタ・うどんなど炭水化物を多めに",
    "脂質は控えめにして消化を良くしましょう",
    "食物繊維の多い食品は控えめに",
    "こまめな水分補給を忘れずに",
  ],
  RACE_WEEK: [
    "消化の良い食事を心がけましょう",
    "生ものや刺激物は避けましょう",
    "前日の夕食は早めに、炭水化物中心で",
    "水分とナトリウムの補給を意識しましょう",
  ],
  RACE_DAY: [
    "レース3時間前までに朝食を済ませましょう",
    "おにぎり・バナナなど消化の良い炭水化物を",
    "レース中はこまめな給水・給食を",
    "完走を目指して楽しみましょう！",
  ],
  RECOVERY: [
    "レース後30分以内にリカバリー食を",
    "たんぱく質をしっかり摂って筋肉の回復を",
    "ビタミンC・Eで酸化ストレスに対抗",
    "無理せずゆっくり休みましょう",
  ],
};

/** 水分プリセット */
export const HYDRATION_PRESETS = [
  { label: "コップ1杯", amount: 200, icon: "💧" },
  { label: "ペットボトル", amount: 500, icon: "🍶" },
  { label: "マグカップ", amount: 250, icon: "☕" },
  { label: "スポーツドリンク", amount: 500, icon: "🥤" },
] as const;
