import { createContext, useContext, useCallback, useSyncExternalStore } from "react";
import type {
  AppData,
  UserProfile,
  WeightEntry,
  MealEntry,
  HydrationEntry,
  FavoriteMenu,
  AppSettings,
} from "../types";
import { loadAppData, saveAppData } from "../services/storageService";
import { generateId, getToday } from "../utils/dateUtils";

// ストアの通知リスナー
let listeners: Array<() => void> = [];

function emitChange() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

let cachedData: AppData | null = null;

function getSnapshot(): AppData {
  if (!cachedData) {
    cachedData = loadAppData();
  }
  return cachedData;
}

function updateData(updater: (prev: AppData) => AppData): void {
  const prev = getSnapshot();
  const next = updater(prev);
  cachedData = next;
  saveAppData(next);
  emitChange();
}

/** アプリデータのカスタムフック */
export function useAppData() {
  const data = useSyncExternalStore(subscribe, getSnapshot);

  const setProfile = useCallback((profile: UserProfile) => {
    updateData((prev) => ({ ...prev, profile }));
  }, []);

  const addWeightEntry = useCallback((weight: number, note?: string) => {
    const entry: WeightEntry = {
      id: generateId(),
      date: getToday(),
      weight,
      note,
    };
    updateData((prev) => ({
      ...prev,
      weightEntries: [...prev.weightEntries, entry],
    }));
  }, []);

  const deleteWeightEntry = useCallback((id: string) => {
    updateData((prev) => ({
      ...prev,
      weightEntries: prev.weightEntries.filter((e) => e.id !== id),
    }));
  }, []);

  const addMealEntry = useCallback((entry: Omit<MealEntry, "id">) => {
    const newEntry: MealEntry = { ...entry, id: generateId() };
    updateData((prev) => ({
      ...prev,
      mealEntries: [...prev.mealEntries, newEntry],
    }));
  }, []);

  const deleteMealEntry = useCallback((id: string) => {
    updateData((prev) => ({
      ...prev,
      mealEntries: prev.mealEntries.filter((e) => e.id !== id),
    }));
  }, []);

  const addHydrationEntry = useCallback((amount: number, type: string) => {
    const entry: HydrationEntry = {
      id: generateId(),
      date: getToday(),
      amount,
      type,
      timestamp: new Date().toISOString(),
    };
    updateData((prev) => ({
      ...prev,
      hydrationEntries: [...prev.hydrationEntries, entry],
    }));
  }, []);

  const deleteHydrationEntry = useCallback((id: string) => {
    updateData((prev) => ({
      ...prev,
      hydrationEntries: prev.hydrationEntries.filter((e) => e.id !== id),
    }));
  }, []);

  const addFavorite = useCallback((fav: Omit<FavoriteMenu, "id">) => {
    const newFav: FavoriteMenu = { ...fav, id: generateId() };
    updateData((prev) => ({
      ...prev,
      favorites: [...prev.favorites, newFav],
    }));
  }, []);

  const deleteFavorite = useCallback((id: string) => {
    updateData((prev) => ({
      ...prev,
      favorites: prev.favorites.filter((f) => f.id !== id),
    }));
  }, []);

  const updateSettings = useCallback((settings: Partial<AppSettings>) => {
    updateData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  }, []);

  const replaceData = useCallback((newData: AppData) => {
    cachedData = newData;
    saveAppData(newData);
    emitChange();
  }, []);

  return {
    data,
    setProfile,
    addWeightEntry,
    deleteWeightEntry,
    addMealEntry,
    deleteMealEntry,
    addHydrationEntry,
    deleteHydrationEntry,
    addFavorite,
    deleteFavorite,
    updateSettings,
    replaceData,
  };
}

// コンテキスト（必要に応じて使用）
export const AppDataContext = createContext<ReturnType<typeof useAppData> | null>(null);

export function useAppDataContext() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("AppDataContext not found");
  return ctx;
}
