import type { AppData } from "../types";

const STORAGE_KEY = "marathon-nutrition-data";
const CURRENT_VERSION = 1;

/** デフォルトのアプリデータ */
export function createDefaultAppData(): AppData {
  return {
    version: CURRENT_VERSION,
    profile: null,
    weightEntries: [],
    mealEntries: [],
    hydrationEntries: [],
    favorites: [],
    settings: {
      dailyHydrationGoal: 2000,
      enableNotifications: false,
    },
  };
}

/** localStorageからデータを読み込む */
export function loadAppData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultAppData();

    const parsed = JSON.parse(raw) as AppData;
    // バージョンマイグレーションが必要な場合はここに追加
    return { ...createDefaultAppData(), ...parsed };
  } catch {
    return createDefaultAppData();
  }
}

/** localStorageにデータを保存する */
export function saveAppData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("データの保存に失敗しました:", e);
  }
}

/** localStorageのデータをクリアする */
export function clearAppData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
