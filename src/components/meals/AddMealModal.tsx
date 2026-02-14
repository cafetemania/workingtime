import { useState } from "react";
import type { MealType, MealItem, FoodItem } from "../../types";
import { useFoodSearch } from "../../hooks/useFoodSearch";
import { createMealItem, sumNutrients } from "../../services/nutrientCalculator";
import { generateId } from "../../utils/dateUtils";

const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: "朝食",
  lunch: "昼食",
  dinner: "夕食",
  snack: "間食",
};

interface AddMealModalProps {
  readonly mealType: MealType;
  readonly onAdd: (mealType: MealType, items: MealItem[]) => void;
  readonly onClose: () => void;
  readonly onSaveFavorite: (name: string, items: readonly MealItem[]) => void;
}

export function AddMealModal({ mealType, onAdd, onClose, onSaveFavorite }: AddMealModalProps) {
  const { query, results, search, clear } = useFoodSearch();
  const [items, setItems] = useState<MealItem[]>([]);
  const [amount, setAmount] = useState("100");
  const [favName, setFavName] = useState("");
  const [showFavInput, setShowFavInput] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  // カスタム食品入力
  const [customName, setCustomName] = useState("");
  const [customEnergy, setCustomEnergy] = useState("");
  const [customProtein, setCustomProtein] = useState("");
  const [customFat, setCustomFat] = useState("");
  const [customCarb, setCustomCarb] = useState("");
  const [customAmount, setCustomAmount] = useState("1");

  const handleSelectFood = (food: FoodItem) => {
    const amountG = parseFloat(amount) || 100;
    const item = createMealItem(food, amountG);
    setItems([...items, item]);
    clear();
    setAmount("100");
  };

  const handleAddCustom = () => {
    const name = customName.trim();
    if (!name) return;
    const energy = parseFloat(customEnergy) || 0;
    const protein = parseFloat(customProtein) || 0;
    const fat = parseFloat(customFat) || 0;
    const carb = parseFloat(customCarb) || 0;
    const qty = parseFloat(customAmount) || 1;

    const item: MealItem = {
      foodId: `custom-${generateId()}`,
      foodName: `${name}${qty !== 1 ? ` x${qty}` : ""}`,
      amount: qty,
      nutrients: {
        energy: Math.round(energy * qty),
        protein: Math.round(protein * qty * 10) / 10,
        fat: Math.round(fat * qty * 10) / 10,
        carbohydrate: Math.round(carb * qty * 10) / 10,
      },
    };
    setItems([...items, item]);
    setCustomName("");
    setCustomEnergy("");
    setCustomProtein("");
    setCustomFat("");
    setCustomCarb("");
    setCustomAmount("1");
    setShowCustom(false);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (items.length === 0) return;
    onAdd(mealType, items);
  };

  const handleSaveFavorite = () => {
    if (items.length === 0 || !favName.trim()) return;
    onSaveFavorite(favName.trim(), items);
    setShowFavInput(false);
    setFavName("");
  };

  const totals = sumNutrients(items);
  const canAddCustom = customName.trim().length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-end justify-center">
      <div className="bg-white rounded-t-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex-shrink-0 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
          <h2 className="font-bold text-lg">{MEAL_TYPE_LABELS[mealType]}を追加</h2>
          <button onClick={onClose} className="text-slate-400 text-2xl leading-none">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* 食品検索 */}
          {!showCustom && (
            <>
              <div>
                <input
                  type="text"
                  className="input-field"
                  placeholder="食品名を検索..."
                  value={query}
                  onChange={(e) => search(e.target.value)}
                  autoFocus
                />
              </div>

              {/* 検索結果 */}
              {results.length > 0 && (
                <div className="border border-slate-200 rounded-lg max-h-48 overflow-y-auto">
                  {results.map((food) => (
                    <button
                      key={food.id}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 border-b border-slate-100 last:border-0"
                      onClick={() => handleSelectFood(food)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{food.name}</p>
                          <p className="text-xs text-slate-400">{food.category}</p>
                        </div>
                        <p className="text-xs text-slate-500">{food.per100g.energy}kcal/100g</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* 量の入力 */}
              {results.length > 0 && (
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-500">量:</label>
                  <input
                    type="number"
                    className="input-field w-24"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min={1}
                    max={5000}
                  />
                  <span className="text-sm text-slate-500">g</span>
                </div>
              )}

              {/* 検索結果がないとき or DBにないとき */}
              {query.length >= 2 && results.length === 0 && (
                <div className="text-center py-3">
                  <p className="text-sm text-slate-400 mb-2">「{query}」は見つかりませんでした</p>
                  <button
                    className="text-sm text-primary-600 font-medium underline"
                    onClick={() => {
                      setCustomName(query);
                      setShowCustom(true);
                      clear();
                    }}
                  >
                    手入力で追加する
                  </button>
                </div>
              )}

              {/* カスタム入力への切替ボタン */}
              <button
                className="w-full text-sm text-slate-500 hover:text-primary-600 py-1"
                onClick={() => setShowCustom(true)}
              >
                DBにない食品を手入力で追加
              </button>
            </>
          )}

          {/* カスタム食品入力フォーム */}
          {showCustom && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-slate-700">手入力で追加</h3>
                <button
                  className="text-xs text-slate-400 hover:text-slate-600"
                  onClick={() => setShowCustom(false)}
                >
                  検索に戻る
                </button>
              </div>
              <p className="text-xs text-slate-400">パッケージの栄養表示を参考に入力してください（1人前/1個あたり）</p>

              <div>
                <label className="label">食品名</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="例: チキンカツ弁当"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="label">カロリー (kcal)</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="500"
                    value={customEnergy}
                    onChange={(e) => setCustomEnergy(e.target.value)}
                    min={0}
                  />
                </div>
                <div>
                  <label className="label">数量</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="1"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    min={0.1}
                    step={0.1}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="label text-red-500">P (g)</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="20"
                    value={customProtein}
                    onChange={(e) => setCustomProtein(e.target.value)}
                    min={0}
                    step={0.1}
                  />
                </div>
                <div>
                  <label className="label text-yellow-500">F (g)</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="15"
                    value={customFat}
                    onChange={(e) => setCustomFat(e.target.value)}
                    min={0}
                    step={0.1}
                  />
                </div>
                <div>
                  <label className="label text-blue-500">C (g)</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="60"
                    value={customCarb}
                    onChange={(e) => setCustomCarb(e.target.value)}
                    min={0}
                    step={0.1}
                  />
                </div>
              </div>

              <button
                className="btn-primary w-full"
                disabled={!canAddCustom}
                onClick={handleAddCustom}
              >
                追加
              </button>
            </div>
          )}

          {/* 追加済みアイテム */}
          {items.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-500">追加した食品</h3>
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-50 rounded-lg px-3 py-2">
                  <div>
                    <p className="text-sm">{item.foodName} ({item.amount}g)</p>
                    <p className="text-xs text-slate-400">
                      {item.nutrients.energy}kcal P:{item.nutrients.protein}g F:{item.nutrients.fat}g C:{item.nutrients.carbohydrate}g
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(idx)}
                    className="text-red-400 text-sm"
                  >
                    &times;
                  </button>
                </div>
              ))}

              {/* 合計 */}
              <div className="bg-primary-50 rounded-lg px-3 py-2">
                <p className="text-sm font-medium text-primary-700">
                  合計: {totals.energy}kcal | P:{totals.protein}g F:{totals.fat}g C:{totals.carbohydrate}g
                </p>
              </div>
            </div>
          )}
        </div>

        {/* フッターボタン */}
        <div className="flex-shrink-0 bg-white border-t border-slate-200 px-4 py-3 space-y-2">
          {showFavInput ? (
            <div className="flex gap-2">
              <input
                type="text"
                className="input-field flex-1"
                placeholder="お気に入り名"
                value={favName}
                onChange={(e) => setFavName(e.target.value)}
              />
              <button className="btn-secondary" onClick={handleSaveFavorite}>
                保存
              </button>
              <button className="text-sm text-slate-400" onClick={() => setShowFavInput(false)}>
                取消
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                className="btn-secondary flex-1"
                disabled={items.length === 0}
                onClick={() => setShowFavInput(true)}
              >
                お気に入りに保存
              </button>
              <button
                className="btn-primary flex-1"
                disabled={items.length === 0}
                onClick={handleSave}
              >
                記録する
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
