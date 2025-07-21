const fs = require('fs');
const path = require('path');

// politicians.jsonを読み込み
const politiciansPath = path.join(__dirname, 'src/data/politicians.json');
const politiciansData = JSON.parse(fs.readFileSync(politiciansPath, 'utf8'));

// 2025年参議院選挙当選者（参議院議員の一部を例として設定）
const elected2025Ids = [
  "pol2",  // 本田 顕子 (参議院)
  "pol3",  // 榛葉 賀津也 (参議院)
  "pol6",  // 神谷 宗幣 (参議院)
  "pol8",  // 神谷 政幸 (参議院)
  "pol12", // 伊藤 孝恵 (参議院)
  "pol21", // 山本 太郎 (参議院)
  "pol22", // 福島 瑞穂 (参議院)
  "pol28", // 浜口 誠 (参議院)
  "pol29", // 舟山 康江 (参議院)
  "pol31", // 礒﨑 哲史 (参議院)
  "pol32", // 田村 麻美 (参議院)
  "pol34", // 川合 孝典 (参議院)
  "pol36", // 小野田 紀美 (参議院)
  "pol42", // 猪瀬 直樹 (参議院)
  "pol43", // 青山 繁晴 (参議院)
  "pol44", // 今井 絵理子 (参議院)
  "pol45", // 宮沢 洋一 (参議院)
  "pol46", // 橋本 聖子 (参議院)
  "pol47", // 中田 宏 (参議院)
  "pol48", // 西田 実仁 (参議院)
  "pol49", // 佐々木 さやか (参議院)
  "pol50", // 伊藤 孝江 (参議院)
  "pol53", // 加田 裕之 (参議院)
  "pol54", // 片山 さつき (参議院)
  "pol55", // 杉尾 秀哉 (参議院)
  "pol56", // 石垣 のりこ (参議院)
  "pol59", // 永江 孝子 (参議院)
  "pol63", // 高木 かおり (参議院)
  "pol64", // 松野 明美 (参議院)
  "pol66", // 藤巻 健史 (参議院)
  "pol71", // 大椿 裕子 (参議院)
  "pol74", // 山添 拓 (参議院)
  "pol75", // 小池 晃 (参議院)
  "pol76", // 吉良 佳子 (参議院)
  "pol80", // 梅村 みずほ (参議院)
  "pol81", // 伊藤 岳 (参議院)
  "pol82", // 大島 九州男 (参議院)
  "pol84", // 大石 晃子 (参議院)
  "pol86", // 浜野 喜史 (参議院)
  "pol87", // 竹詰 仁 (参議院)
  "pol90", // 佐藤 正久 (参議院)
  "pol91", // 比嘉 奈津美 (参議院)
  "pol92", // 浅尾 慶一郎 (参議院)
  "pol93"  // 石井 浩郎 (参議院)
];

// 落選・引退した議員（例として一部設定）
const disabledIds = [
  // 実際の落選・引退情報に基づいて設定
  // 例: "polX", "polY" など
];

// すべての議員にフラグを追加
politiciansData.politicians = politiciansData.politicians.map(politician => {
  const isElected2025 = elected2025Ids.includes(politician.id);
  const isDisabled = disabledIds.includes(politician.id);
  
  return {
    ...politician,
    disabled: isDisabled,
    elected2025: isElected2025
  };
});

// 更新されたデータを書き込み
fs.writeFileSync(politiciansPath, JSON.stringify(politiciansData, null, 2), 'utf8');

console.log('politicians.json updated successfully!');
console.log(`Total politicians: ${politiciansData.politicians.length}`);
console.log(`Elected 2025: ${elected2025Ids.length}`);
console.log(`Disabled: ${disabledIds.length}`);

// 参議院議員の統計を表示
const upperHousePoliticians = politiciansData.politicians.filter(p => p.house === '参議院');
const elected2025UpperHouse = politiciansData.politicians.filter(p => p.elected2025 === true && p.house === '参議院');
console.log(`Upper house politicians: ${upperHousePoliticians.length}`);
console.log(`Elected 2025 upper house: ${elected2025UpperHouse.length}`); 