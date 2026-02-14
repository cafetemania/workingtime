import { useState, useMemo, useCallback } from "react";
import type { FoodItem } from "../types";
import { foodDatabase } from "../data/foodDatabase";

/** 食品データベースを検索するフック */
export function useFoodSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo((): FoodItem[] => {
    if (query.length < 1) return [];

    const normalizedQuery = query.toLowerCase().trim();

    return foodDatabase
      .filter(
        (food) =>
          food.name.toLowerCase().includes(normalizedQuery) ||
          food.category.toLowerCase().includes(normalizedQuery),
      )
      .slice(0, 20);
  }, [query]);

  const search = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const clear = useCallback(() => {
    setQuery("");
  }, []);

  return { query, results, search, clear };
}
