import type { FoodItem } from "../types";

/** 日本食品標準成分表(八訂)ベースの食品データベース（主要品目） */
export const foodDatabase: readonly FoodItem[] = [
  // 穀類
  { id: "g001", name: "白飯（ごはん）", category: "穀類", per100g: { energy: 156, protein: 2.5, fat: 0.3, carbohydrate: 37.1 } },
  { id: "g002", name: "玄米飯", category: "穀類", per100g: { energy: 152, protein: 2.8, fat: 1.0, carbohydrate: 35.6 } },
  { id: "g003", name: "食パン", category: "穀類", per100g: { energy: 248, protein: 8.9, fat: 4.1, carbohydrate: 46.4 } },
  { id: "g004", name: "うどん（ゆで）", category: "穀類", per100g: { energy: 95, protein: 2.6, fat: 0.4, carbohydrate: 21.6 } },
  { id: "g005", name: "そば（ゆで）", category: "穀類", per100g: { energy: 130, protein: 4.8, fat: 1.0, carbohydrate: 26.0 } },
  { id: "g006", name: "スパゲッティ（ゆで）", category: "穀類", per100g: { energy: 149, protein: 5.2, fat: 0.9, carbohydrate: 30.3 } },
  { id: "g007", name: "もち", category: "穀類", per100g: { energy: 223, protein: 4.0, fat: 0.6, carbohydrate: 50.8 } },
  { id: "g008", name: "コーンフレーク", category: "穀類", per100g: { energy: 380, protein: 7.8, fat: 1.7, carbohydrate: 83.6 } },
  { id: "g009", name: "オートミール", category: "穀類", per100g: { energy: 350, protein: 13.7, fat: 5.7, carbohydrate: 69.1 } },
  { id: "g010", name: "おにぎり（塩）", category: "穀類", per100g: { energy: 170, protein: 2.7, fat: 0.3, carbohydrate: 39.4 } },

  // 肉類
  { id: "m001", name: "鶏むね肉（皮なし）", category: "肉類", per100g: { energy: 105, protein: 23.3, fat: 1.9, carbohydrate: 0.0 } },
  { id: "m002", name: "鶏もも肉（皮なし）", category: "肉類", per100g: { energy: 127, protein: 19.0, fat: 5.0, carbohydrate: 0.0 } },
  { id: "m003", name: "鶏ささみ", category: "肉類", per100g: { energy: 98, protein: 23.9, fat: 0.8, carbohydrate: 0.1 } },
  { id: "m004", name: "豚ロース（脂身つき）", category: "肉類", per100g: { energy: 248, protein: 19.3, fat: 19.2, carbohydrate: 0.2 } },
  { id: "m005", name: "豚ヒレ", category: "肉類", per100g: { energy: 118, protein: 22.2, fat: 3.7, carbohydrate: 0.3 } },
  { id: "m006", name: "豚もも（脂身なし）", category: "肉類", per100g: { energy: 128, protein: 22.1, fat: 3.6, carbohydrate: 0.2 } },
  { id: "m007", name: "牛もも（脂身なし）", category: "肉類", per100g: { energy: 165, protein: 21.3, fat: 9.6, carbohydrate: 0.4 } },
  { id: "m008", name: "牛ヒレ", category: "肉類", per100g: { energy: 195, protein: 20.5, fat: 11.2, carbohydrate: 0.3 } },
  { id: "m009", name: "ベーコン", category: "肉類", per100g: { energy: 400, protein: 12.9, fat: 39.1, carbohydrate: 0.3 } },
  { id: "m010", name: "ウインナー", category: "肉類", per100g: { energy: 319, protein: 11.5, fat: 28.5, carbohydrate: 3.3 } },

  // 魚介類
  { id: "f001", name: "鮭（焼き）", category: "魚介類", per100g: { energy: 171, protein: 26.8, fat: 7.4, carbohydrate: 0.1 } },
  { id: "f002", name: "まぐろ赤身", category: "魚介類", per100g: { energy: 106, protein: 26.4, fat: 1.4, carbohydrate: 0.1 } },
  { id: "f003", name: "さば（焼き）", category: "魚介類", per100g: { energy: 264, protein: 25.2, fat: 17.8, carbohydrate: 0.3 } },
  { id: "f004", name: "あじ（焼き）", category: "魚介類", per100g: { energy: 149, protein: 25.9, fat: 5.4, carbohydrate: 0.1 } },
  { id: "f005", name: "えび（ゆで）", category: "魚介類", per100g: { energy: 82, protein: 18.4, fat: 0.3, carbohydrate: 0.3 } },
  { id: "f006", name: "ツナ缶（水煮）", category: "魚介類", per100g: { energy: 71, protein: 16.0, fat: 0.7, carbohydrate: 0.2 } },
  { id: "f007", name: "さんま（焼き）", category: "魚介類", per100g: { energy: 270, protein: 23.3, fat: 19.4, carbohydrate: 0.1 } },
  { id: "f008", name: "刺身（まぐろ赤身）", category: "魚介類", per100g: { energy: 106, protein: 26.4, fat: 1.4, carbohydrate: 0.1 } },
  { id: "f009", name: "刺身（かつお）", category: "魚介類", per100g: { energy: 114, protein: 25.8, fat: 0.5, carbohydrate: 0.1 } },

  // 卵・乳製品
  { id: "e001", name: "鶏卵（全卵・ゆで）", category: "卵類", per100g: { energy: 134, protein: 12.5, fat: 10.0, carbohydrate: 0.3 } },
  { id: "e002", name: "卵焼き", category: "卵類", per100g: { energy: 151, protein: 11.3, fat: 10.1, carbohydrate: 3.6 } },
  { id: "e003", name: "生卵（全卵）", category: "卵類", per100g: { energy: 142, protein: 12.2, fat: 10.2, carbohydrate: 0.4 } },
  { id: "d001", name: "牛乳", category: "乳製品", per100g: { energy: 61, protein: 3.3, fat: 3.8, carbohydrate: 4.8 } },
  { id: "d002", name: "ヨーグルト（無糖）", category: "乳製品", per100g: { energy: 56, protein: 3.6, fat: 3.0, carbohydrate: 4.9 } },
  { id: "d003", name: "プロセスチーズ", category: "乳製品", per100g: { energy: 313, protein: 22.7, fat: 26.0, carbohydrate: 1.3 } },
  { id: "d004", name: "ギリシャヨーグルト", category: "乳製品", per100g: { energy: 100, protein: 10.0, fat: 4.0, carbohydrate: 5.0 } },

  // 豆類
  { id: "b001", name: "木綿豆腐", category: "豆類", per100g: { energy: 73, protein: 7.0, fat: 4.9, carbohydrate: 1.5 } },
  { id: "b002", name: "絹ごし豆腐", category: "豆類", per100g: { energy: 56, protein: 5.3, fat: 3.5, carbohydrate: 2.0 } },
  { id: "b006", name: "豆腐（冷奴・1丁）", category: "豆類", per100g: { energy: 56, protein: 5.3, fat: 3.5, carbohydrate: 2.0 } },
  { id: "b003", name: "納豆", category: "豆類", per100g: { energy: 190, protein: 16.5, fat: 10.0, carbohydrate: 12.1 } },
  { id: "b004", name: "豆乳（無調整）", category: "豆類", per100g: { energy: 44, protein: 3.6, fat: 2.0, carbohydrate: 3.1 } },
  { id: "b005", name: "枝豆（ゆで）", category: "豆類", per100g: { energy: 118, protein: 11.5, fat: 6.1, carbohydrate: 8.9 } },

  // 野菜類
  { id: "v001", name: "キャベツ", category: "野菜", per100g: { energy: 21, protein: 1.3, fat: 0.2, carbohydrate: 5.2 } },
  { id: "v002", name: "トマト", category: "野菜", per100g: { energy: 20, protein: 0.7, fat: 0.1, carbohydrate: 4.7 } },
  { id: "v003", name: "ほうれん草（ゆで）", category: "野菜", per100g: { energy: 23, protein: 2.6, fat: 0.5, carbohydrate: 3.1 } },
  { id: "v004", name: "ブロッコリー（ゆで）", category: "野菜", per100g: { energy: 30, protein: 3.9, fat: 0.4, carbohydrate: 4.3 } },
  { id: "v005", name: "にんじん", category: "野菜", per100g: { energy: 30, protein: 0.7, fat: 0.2, carbohydrate: 9.3 } },
  { id: "v006", name: "たまねぎ", category: "野菜", per100g: { energy: 33, protein: 1.0, fat: 0.1, carbohydrate: 8.4 } },
  { id: "v007", name: "かぼちゃ", category: "野菜", per100g: { energy: 78, protein: 1.6, fat: 0.3, carbohydrate: 20.6 } },
  { id: "v008", name: "さつまいも", category: "野菜", per100g: { energy: 126, protein: 1.2, fat: 0.2, carbohydrate: 31.9 } },
  { id: "v009", name: "じゃがいも（蒸し）", category: "野菜", per100g: { energy: 76, protein: 1.5, fat: 0.1, carbohydrate: 18.1 } },
  { id: "v010", name: "アボカド", category: "野菜", per100g: { energy: 176, protein: 2.1, fat: 17.5, carbohydrate: 7.9 } },

  // 果物
  { id: "fr001", name: "バナナ", category: "果物", per100g: { energy: 93, protein: 1.1, fat: 0.2, carbohydrate: 22.5 } },
  { id: "fr002", name: "りんご", category: "果物", per100g: { energy: 53, protein: 0.2, fat: 0.2, carbohydrate: 15.5 } },
  { id: "fr003", name: "みかん", category: "果物", per100g: { energy: 49, protein: 0.7, fat: 0.1, carbohydrate: 12.0 } },
  { id: "fr004", name: "キウイフルーツ", category: "果物", per100g: { energy: 51, protein: 1.0, fat: 0.2, carbohydrate: 13.4 } },
  { id: "fr005", name: "いちご", category: "果物", per100g: { energy: 31, protein: 0.9, fat: 0.1, carbohydrate: 8.5 } },
  { id: "fr006", name: "オレンジ", category: "果物", per100g: { energy: 48, protein: 1.0, fat: 0.1, carbohydrate: 11.8 } },

  // 調味料・油
  { id: "s001", name: "オリーブオイル", category: "油脂", per100g: { energy: 894, protein: 0.0, fat: 100.0, carbohydrate: 0.0 } },
  { id: "s002", name: "バター", category: "油脂", per100g: { energy: 700, protein: 0.6, fat: 81.0, carbohydrate: 0.2 } },
  { id: "s003", name: "マヨネーズ", category: "調味料", per100g: { energy: 668, protein: 1.3, fat: 74.7, carbohydrate: 1.7 } },
  { id: "s004", name: "味噌", category: "調味料", per100g: { energy: 182, protein: 12.5, fat: 6.0, carbohydrate: 21.9 } },

  // ランナーに人気の食品
  { id: "r001", name: "プロテインバー", category: "サプリメント", per100g: { energy: 380, protein: 30.0, fat: 12.0, carbohydrate: 35.0 } },
  { id: "r002", name: "エネルギージェル", category: "サプリメント", per100g: { energy: 280, protein: 0.0, fat: 0.0, carbohydrate: 70.0 } },
  { id: "r003", name: "プロテインパウダー（ホエイ）", category: "サプリメント", per100g: { energy: 370, protein: 75.0, fat: 5.0, carbohydrate: 10.0 } },
  { id: "r004", name: "ナッツミックス", category: "ナッツ", per100g: { energy: 607, protein: 20.0, fat: 54.0, carbohydrate: 17.0 } },
  { id: "r005", name: "ドライフルーツ（レーズン）", category: "果物", per100g: { energy: 315, protein: 2.7, fat: 0.2, carbohydrate: 80.3 } },
  { id: "r006", name: "はちみつ", category: "調味料", per100g: { energy: 329, protein: 0.3, fat: 0.0, carbohydrate: 81.9 } },

  // 定番の定食メニュー（1人前相当、量は100gあたりに換算）
  { id: "menu001", name: "鶏の照り焼き", category: "料理", per100g: { energy: 178, protein: 18.5, fat: 8.2, carbohydrate: 7.5 } },
  { id: "menu002", name: "豚の生姜焼き", category: "料理", per100g: { energy: 210, protein: 17.0, fat: 13.5, carbohydrate: 5.8 } },
  { id: "menu003", name: "肉じゃが", category: "料理", per100g: { energy: 95, protein: 4.5, fat: 3.2, carbohydrate: 12.8 } },
  { id: "menu004", name: "味噌汁", category: "料理", per100g: { energy: 21, protein: 1.5, fat: 0.6, carbohydrate: 2.2 } },
  { id: "menu005", name: "サラダ（ドレッシング込）", category: "料理", per100g: { energy: 45, protein: 1.2, fat: 2.5, carbohydrate: 5.0 } },
  { id: "menu006", name: "カレーライス", category: "料理", per100g: { energy: 140, protein: 4.5, fat: 4.2, carbohydrate: 22.0 } },
  { id: "menu007", name: "親子丼", category: "料理", per100g: { energy: 145, protein: 7.5, fat: 3.8, carbohydrate: 22.5 } },
  { id: "menu008", name: "牛丼", category: "料理", per100g: { energy: 155, protein: 6.8, fat: 5.5, carbohydrate: 21.0 } },
  { id: "menu009", name: "唐揚げ", category: "料理", per100g: { energy: 280, protein: 18.0, fat: 18.5, carbohydrate: 10.5 } },
  { id: "menu010", name: "焼き鮭定食", category: "料理", per100g: { energy: 130, protein: 12.0, fat: 4.5, carbohydrate: 12.0 } },

  // コンビニ食品
  { id: "cv001", name: "おにぎり（鮭）", category: "コンビニ", per100g: { energy: 175, protein: 4.5, fat: 1.2, carbohydrate: 38.0 } },
  { id: "cv002", name: "おにぎり（ツナマヨ）", category: "コンビニ", per100g: { energy: 195, protein: 4.0, fat: 5.5, carbohydrate: 33.5 } },
  { id: "cv003", name: "サラダチキン", category: "コンビニ", per100g: { energy: 105, protein: 23.0, fat: 1.5, carbohydrate: 0.5 } },
  { id: "cv004", name: "サンドイッチ（ハムチーズ）", category: "コンビニ", per100g: { energy: 235, protein: 9.5, fat: 10.5, carbohydrate: 27.0 } },
  { id: "cv005", name: "肉まん", category: "コンビニ", per100g: { energy: 210, protein: 8.0, fat: 7.5, carbohydrate: 28.5 } },

  // 洋食・シチュー系
  { id: "menu011", name: "ハヤシライス", category: "料理", per100g: { energy: 148, protein: 4.8, fat: 5.2, carbohydrate: 21.5 } },
  { id: "menu012", name: "ハッシュドビーフ", category: "料理", per100g: { energy: 120, protein: 5.5, fat: 6.8, carbohydrate: 9.2 } },
  { id: "menu013", name: "ビーフシチュー", category: "料理", per100g: { energy: 118, protein: 6.2, fat: 6.5, carbohydrate: 8.8 } },
  { id: "menu014", name: "クリームシチュー", category: "料理", per100g: { energy: 105, protein: 4.5, fat: 5.8, carbohydrate: 9.5 } },
  { id: "menu015", name: "オムライス", category: "料理", per100g: { energy: 152, protein: 5.5, fat: 5.8, carbohydrate: 20.5 } },
  { id: "menu016", name: "グラタン", category: "料理", per100g: { energy: 130, protein: 5.8, fat: 7.2, carbohydrate: 11.5 } },
  { id: "menu017", name: "ハンバーグ", category: "料理", per100g: { energy: 210, protein: 14.5, fat: 13.8, carbohydrate: 8.5 } },
  { id: "menu018", name: "コロッケ", category: "料理", per100g: { energy: 225, protein: 5.2, fat: 12.5, carbohydrate: 24.0 } },
  { id: "menu019", name: "とんかつ", category: "料理", per100g: { energy: 295, protein: 18.0, fat: 20.5, carbohydrate: 10.5 } },
  { id: "menu020", name: "餃子", category: "料理", per100g: { energy: 220, protein: 9.5, fat: 11.0, carbohydrate: 21.0 } },

  // 麺類
  { id: "menu021", name: "ラーメン（醤油）", category: "料理", per100g: { energy: 85, protein: 4.2, fat: 2.8, carbohydrate: 11.5 } },
  { id: "menu022", name: "焼きそば", category: "料理", per100g: { energy: 145, protein: 5.0, fat: 5.5, carbohydrate: 20.0 } },
  { id: "menu023", name: "ナポリタン", category: "料理", per100g: { energy: 140, protein: 4.8, fat: 4.5, carbohydrate: 21.0 } },
  { id: "menu024", name: "ペペロンチーノ", category: "料理", per100g: { energy: 165, protein: 5.0, fat: 6.5, carbohydrate: 22.5 } },
  { id: "menu025", name: "カルボナーラ", category: "料理", per100g: { energy: 180, protein: 7.5, fat: 8.5, carbohydrate: 20.0 } },

  // 和食追加
  { id: "menu026", name: "天ぷら（えび）", category: "料理", per100g: { energy: 210, protein: 12.0, fat: 12.5, carbohydrate: 14.0 } },
  { id: "menu027", name: "すき焼き", category: "料理", per100g: { energy: 155, protein: 8.5, fat: 8.0, carbohydrate: 12.5 } },
  { id: "menu028", name: "豚汁", category: "料理", per100g: { energy: 52, protein: 3.2, fat: 2.5, carbohydrate: 4.5 } },
  { id: "menu029", name: "筑前煮", category: "料理", per100g: { energy: 75, protein: 4.5, fat: 2.0, carbohydrate: 10.0 } },
  { id: "menu030", name: "ひじきの煮物", category: "料理", per100g: { energy: 55, protein: 2.5, fat: 2.0, carbohydrate: 7.5 } },
  { id: "menu031", name: "冷奴", category: "料理", per100g: { energy: 60, protein: 5.5, fat: 3.5, carbohydrate: 2.0 } },
  { id: "menu032", name: "焼き魚定食", category: "料理", per100g: { energy: 125, protein: 11.5, fat: 4.0, carbohydrate: 12.5 } },
  { id: "menu033", name: "ほうれん草のおひたし", category: "料理", per100g: { energy: 28, protein: 2.8, fat: 0.5, carbohydrate: 3.5 } },
  { id: "menu034", name: "チーズトースト", category: "料理", per100g: { energy: 300, protein: 12.5, fat: 13.0, carbohydrate: 33.0 } },
  { id: "menu035", name: "今川焼（あんこ）", category: "菓子", per100g: { energy: 222, protein: 4.8, fat: 1.5, carbohydrate: 48.0 } },
  { id: "menu036", name: "今川焼（カスタード）", category: "菓子", per100g: { energy: 230, protein: 5.5, fat: 4.5, carbohydrate: 42.0 } },

  // 飲料
  { id: "dr001", name: "スポーツドリンク", category: "飲料", per100g: { energy: 25, protein: 0.0, fat: 0.0, carbohydrate: 6.2 } },
  { id: "dr002", name: "オレンジジュース", category: "飲料", per100g: { energy: 42, protein: 0.4, fat: 0.1, carbohydrate: 10.7 } },
  { id: "dr003", name: "豆乳（調整）", category: "飲料", per100g: { energy: 63, protein: 3.2, fat: 3.6, carbohydrate: 4.5 } },
] as const;
