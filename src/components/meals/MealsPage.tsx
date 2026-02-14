import { useState } from "react";
import { useAppData } from "../../hooks/useAppData";
import { getToday, formatDateShort } from "../../utils/dateUtils";
import { sumDailyNutrients } from "../../services/pfcCalculator";
import { AddMealModal } from "./AddMealModal";
import type { MealType, MealItem } from "../../types";

const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: "朝食",
  lunch: "昼食",
  dinner: "夕食",
  snack: "間食",
};

const MEAL_ICONS: Record<MealType, string> = {
  breakfast: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707",
  lunch: "M12 6v6m0 0v6m0-6h6m-6 0H6",
  dinner: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
  snack: "M13 10V3L4 14h7v7l9-11h-7z",
};

export function MealsPage() {
  const { data, addMealEntry, deleteMealEntry, addFavorite, deleteFavorite } = useAppData();
  const [showModal, setShowModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<MealType>("breakfast");
  const today = getToday();

  const todayMeals = data.mealEntries.filter((e) => e.date === today);
  const todayNutrients = sumDailyNutrients(data.mealEntries, today);

  const handleAddMeal = (mealType: MealType, items: MealItem[]) => {
    addMealEntry({ date: today, mealType, items });
    setShowModal(false);
  };

  const handleAddFavorite = (name: string, items: readonly MealItem[]) => {
    addFavorite({ name, items });
  };

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-14 pb-2">
        <h1 className="large-title">食事</h1>
      </div>

      <div className="px-4 pb-6 space-y-4">
        {/* 栄養サマリー */}
        <div className="card">
          <p className="text-[13px] font-semibold mb-3" style={{ color: 'var(--color-secondary-label)' }}>今日の栄養</p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-[11px] uppercase" style={{ color: 'var(--color-tertiary-label)' }}>Cal</p>
              <p className="text-[22px] font-bold tracking-tight">{todayNutrients.energy}</p>
              <p className="text-[11px]" style={{ color: 'var(--color-tertiary-label)' }}>kcal</p>
            </div>
            <div>
              <p className="text-[11px] text-apple-red font-semibold">P</p>
              <p className="text-[22px] font-bold text-apple-red tracking-tight">{todayNutrients.protein}</p>
              <p className="text-[11px]" style={{ color: 'var(--color-tertiary-label)' }}>g</p>
            </div>
            <div>
              <p className="text-[11px] text-apple-orange font-semibold">F</p>
              <p className="text-[22px] font-bold text-apple-orange tracking-tight">{todayNutrients.fat}</p>
              <p className="text-[11px]" style={{ color: 'var(--color-tertiary-label)' }}>g</p>
            </div>
            <div>
              <p className="text-[11px] text-apple-blue font-semibold">C</p>
              <p className="text-[22px] font-bold text-apple-blue tracking-tight">{todayNutrients.carbohydrate}</p>
              <p className="text-[11px]" style={{ color: 'var(--color-tertiary-label)' }}>g</p>
            </div>
          </div>
        </div>

        {/* 食事追加ボタン */}
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(MEAL_TYPE_LABELS) as MealType[]).map((type) => (
            <button
              key={type}
              className="card !p-3 text-center active:scale-95 transition-transform"
              onClick={() => {
                setSelectedMealType(type);
                setShowModal(true);
              }}
            >
              <svg className="w-6 h-6 mx-auto text-apple-blue mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={MEAL_ICONS[type]} />
              </svg>
              <p className="text-[11px] font-medium" style={{ color: 'var(--color-secondary-label)' }}>{MEAL_TYPE_LABELS[type]}</p>
            </button>
          ))}
        </div>

        {/* お気に入り */}
        {data.favorites.length > 0 && (
          <div className="card">
            <p className="text-[13px] font-semibold mb-2" style={{ color: 'var(--color-secondary-label)' }}>お気に入り</p>
            {data.favorites.map((fav) => (
              <div
                key={fav.id}
                className="flex items-center justify-between py-3"
                style={{ boxShadow: "inset 0 -0.5px 0 0 var(--color-separator)" }}
              >
                <button
                  className="text-[15px] text-apple-blue font-medium text-left flex-1 active:opacity-50"
                  onClick={() => handleAddMeal("snack", [...fav.items])}
                >
                  {fav.name}
                </button>
                <button
                  onClick={() => deleteFavorite(fav.id)}
                  className="text-[15px] text-apple-red active:opacity-50 ml-3"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 今日の記録 */}
        <div className="card">
          <p className="text-[13px] font-semibold mb-2" style={{ color: 'var(--color-secondary-label)' }}>
            今日の食事 ({formatDateShort(today)})
          </p>
          {todayMeals.length === 0 ? (
            <p className="text-[15px] text-center py-6" style={{ color: 'var(--color-tertiary-label)' }}>
              まだ記録がありません
            </p>
          ) : (
            <div>
              {todayMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="py-3"
                  style={{ boxShadow: "inset 0 -0.5px 0 0 var(--color-separator)" }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[15px] font-semibold">
                      {MEAL_TYPE_LABELS[meal.mealType]}
                    </span>
                    <button
                      onClick={() => deleteMealEntry(meal.id)}
                      className="text-[13px] text-apple-red active:opacity-50"
                    >
                      削除
                    </button>
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {meal.items.map((item, idx) => (
                      <li key={idx} className="text-[13px] flex justify-between" style={{ color: 'var(--color-secondary-label)' }}>
                        <span>{item.foodName} ({item.amount}g)</span>
                        <span className="tabular-nums">{item.nutrients.energy}kcal</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <AddMealModal
          mealType={selectedMealType}
          onAdd={handleAddMeal}
          onClose={() => setShowModal(false)}
          onSaveFavorite={handleAddFavorite}
        />
      )}
    </div>
  );
}
