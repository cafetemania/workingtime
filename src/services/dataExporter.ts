import type { AppData } from "../types";
import { loadAppData, saveAppData } from "./storageService";

/** データをJSON文字列としてエクスポートする */
export function exportData(): string {
  const data = loadAppData();
  return JSON.stringify(data, null, 2);
}

/** JSONファイルをダウンロードする */
export function downloadAsJson(filename: string): void {
  const json = exportData();
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

/** JSON文字列からデータをインポートする */
export function importData(jsonStr: string): { success: boolean; error?: string } {
  try {
    const parsed = JSON.parse(jsonStr) as unknown;

    // 基本的なバリデーション
    if (typeof parsed !== "object" || parsed === null) {
      return { success: false, error: "無効なデータ形式です" };
    }

    const data = parsed as Record<string, unknown>;
    if (typeof data["version"] !== "number") {
      return { success: false, error: "バージョン情報がありません" };
    }

    if (!Array.isArray(data["weightEntries"])) {
      return { success: false, error: "体重データが不正です" };
    }

    saveAppData(parsed as AppData);
    return { success: true };
  } catch {
    return { success: false, error: "JSONの解析に失敗しました" };
  }
}
