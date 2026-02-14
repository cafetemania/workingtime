/** 体重のバリデーション（20-300kg） */
export function isValidWeight(weight: number): boolean {
  return Number.isFinite(weight) && weight >= 20 && weight <= 300;
}

/** 身長のバリデーション（100-250cm） */
export function isValidHeight(height: number): boolean {
  return Number.isFinite(height) && height >= 100 && height <= 250;
}

/** 年齢のバリデーション（10-120歳） */
export function isValidAge(age: number): boolean {
  return Number.isInteger(age) && age >= 10 && age <= 120;
}

/** 食品量のバリデーション（1-5000g） */
export function isValidFoodAmount(amount: number): boolean {
  return Number.isFinite(amount) && amount >= 1 && amount <= 5000;
}

/** 水分量のバリデーション（1-5000ml） */
export function isValidHydrationAmount(amount: number): boolean {
  return Number.isFinite(amount) && amount >= 1 && amount <= 5000;
}

/** 日付文字列のバリデーション（YYYY-MM-DD） */
export function isValidDateString(dateStr: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}
