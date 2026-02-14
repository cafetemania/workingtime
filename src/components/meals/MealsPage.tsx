import { useState } from "react";
import { Header } from "../layout/Header";
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
    <div>
      <Header title="食事記録" />
      <div className="px-4 py-4 space-y-4">
        {/* 今日の栄養サマリー */}
        <div className="card">
          <h3 className="text-sm font-medium text-slate-500 mb-2">今日の栄養摂取</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-xs text-slate-400">カロリー</p>
              <p className="text-lg font-bold text-slate-800">{todayNutrients.energy}</p>
              <p className="text-xs text-slate-400">kcal</p>
            </div>
            <div>
              <p className="text-xs text-red-400">P</p>
              <p className="text-lg font-bold text-red-500">{todayNutrients.protein}</p>
              <p className="text-xs text-slate-400">g</p>
            </div>
            <div>
              <p className="text-xs text-yellow-400">F</p>
              <p className="text-lg font-bold text-yellow-500">{todayNutrients.fat}</p>
              <p className="text-xs text-slate-400">g</p>
            </div>
            <div>
              <p className="text-xs text-blue-400">C</p>
              <p className="text-lg font-bold text-blue-500">{todayNutrients.carbohydrate}</p>
              <p className="text-xs text-slate-400">g</p>
            </div>
          </div>
        </div>

        {/* 食事追加ボタン */}
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(MEAL_TYPE_LABELS) as MealType[]).map((type) => (
            <button
              key={type}
              className="btn-secondary text-sm py-3"
              onClick={() => {
                setSelectedMealType(type);
                setShowModal(true);
              }}
            >
              + {MEAL_TYPE_LABELS[type]}
            </button>
          ))}
        </div>

        {/* お気に入りメニュー */}
        {data.favorites.length > 0 && (
          <div className="card">
            <h3 className="text-sm font-medium text-slate-500 mb-2">お気に入り</h3>
            <div className="space-y-2">
              {data.favorites.map((fav) => (
                <div key={fav.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <button
                    className="text-sm text-primary-600 font-medium text-left flex-1"
                    onClick={() => handleAddMeal("snack", [...fav.items])}
                  >
                    {fav.name}
                  </button>
                  <button
                    onClick={() => deleteFavorite(fav.id)}
                    className="text-xs text-red-400 hover:text-red-600 ml-2"
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 今日の食事一覧 */}
        <div className="card">
          <h3 className="text-sm font-medium text-slate-500 mb-2">
            今日の食事 ({formatDateShort(today)})
          </h3>
          {todayMeals.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">まだ記録がありません</p>
          ) : (
            <div className="space-y-3">
              {todayMeals.map((meal) => (
                <div key={meal.id} className="border-b border-slate-100 pb-3 last:border-0">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">
                      {MEAL_TYPE_LABELS[meal.mealType]}
                    </span>
                    <button
                      onClick={() => deleteMealEntry(meal.id)}
                      className="text-xs text-red-400 hover:text-red-600"
                    >
                      削除
                    </button>
                  </div>
                  <ul className="mt-1 space-y-1">
                    {meal.items.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-500 flex justify-between">
                        <span>{item.foodName} ({item.amount}g)</span>
                        <span>{item.nutrients.energy}kcal</span>
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
