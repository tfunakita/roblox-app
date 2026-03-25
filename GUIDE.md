# ロブロックス特典ポータル 運用ガイド（後藤さん向け）

## サイトURL
**https://tfunakita.github.io/roblox-app/**

---

## よくある作業

### ① キーワード（パスワード）を変える

`src/data/contents.js` または `src/data/gifts.js` を開いて `keyword` の値を変更する。

```js
keyword: 'ジャンプ名人',  // ← ここを変える
```

---

### ② 「近日公開」→「公開済み」にする

`src/data/gifts.js` の `status` を変更する。

```js
status: 'coming_soon',  // ← 'public' または 'locked' に変える
```

| 値 | 表示 |
|---|---|
| `'public'` | 誰でも見られる |
| `'locked'` | キーワード入力で解放 |
| `'coming_soon'` | 近日公開（グレーアウト） |

---

### ③ YouTube動画のURLを変える

`src/data/contents.js` の `videoUrl` を変更する。

```js
videoUrl: 'https://www.youtube.com/embed/動画ID',
```

※ YouTubeのURLが `https://youtu.be/XXXXX` の場合 → `https://www.youtube.com/embed/XXXXX` に変換する。

---

### ④ 新しいコンテンツを追加する

`src/data/contents.js` の末尾（`]` の前）に以下をコピーして追記する。

```js
{
  id: 'mod_005',           // 他と被らない番号にする
  title: 'タイトル',
  category: 'module',      // module / special / bonus のどれか
  type: 'script',          // script / video / pdf のどれか
  description: '説明文',
  code: null,              // スクリプトがあれば文字列で入れる
  videoUrl: null,          // YouTube embed URL
  pdfUrl: null,            // PDFのパス
  isLocked: true,          // true = キーワード必要、false = 誰でも見られる
  keyword: 'キーワード',    // isLocked: true のときだけ必要
  unlockGuideUrl: 'https://youtube.com/watch?v=XXXX',
  unlockGuideText: '〇〇動画の最後で発表しています！',
},
```

---

## 変更をサイトに反映する手順

```bash
# 1. リポジトリをクローン（最初の1回だけ）
git clone https://github.com/tfunakita/roblox-app.git
cd roblox-app

# 2. ファイルを編集（上記の作業をする）

# 3. GitHubにpush
git add .
git commit -m "変更内容を一言で書く"
git push origin main
```

**pushすると自動でサイトに反映されます（2〜3分かかります）。**

---

## ローカルで動作確認する場合

```bash
npm install   # 最初の1回だけ
npm run dev   # http://localhost:5173 で確認できる
```

---

## わからないことがあれば

船木（@funakitakaya）まで連絡ください。
