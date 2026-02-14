/** 今日の日付を YYYY-MM-DD 形式で返す */
export function getToday(): string {
  return formatDate(new Date());
}

/** Date を YYYY-MM-DD 形式に変換 */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** YYYY-MM-DD 文字列を Date に変換 */
export function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y!, m! - 1, d);
}

/** 2つの日付間の日数差を計算（date2 - date1） */
export function daysBetween(date1: string, date2: string): number {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  const diffMs = d2.getTime() - d1.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/** 日付を「M/D（曜日）」形式でフォーマット */
export function formatDateShort(dateStr: string): string {
  const date = parseDate(dateStr);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const w = weekdays[date.getDay()];
  return `${m}/${d}(${w})`;
}

/** 日付を「YYYY年M月D日」形式でフォーマット */
export function formatDateLong(dateStr: string): string {
  const date = parseDate(dateStr);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}年${m}月${d}日`;
}

/** ユニークIDを生成 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
