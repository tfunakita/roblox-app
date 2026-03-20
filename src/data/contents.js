// ============================================================
// コンテンツデータ
// 新しい項目を追記するだけで自動的にサイトに反映されます
// ============================================================

export const contents = [
  // ── 学習モジュール ──────────────────────────────────────────
  {
    id: 'mod_001',
    title: 'パーツの配置と移動の基本',
    category: 'module',
    type: 'script',
    description: 'Roblox Studioでパーツを配置し、自由に動かす方法を学びます。ゲーム制作の最初の一歩！',
    code: `-- パーツを生成してワークスペースに配置するスクリプト
local part = Instance.new("Part")
part.Size = Vector3.new(4, 1, 4)
part.Position = Vector3.new(0, 5, 0)
part.BrickColor = BrickColor.new("Bright blue")
part.Anchored = true  -- 落ちないように固定
part.Parent = workspace

print("パーツを配置しました！")`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfUrl: null,
    isLocked: false,
    keyword: null,
    unlockGuideUrl: null,
    unlockGuideText: null,
  },
  {
    id: 'mod_002',
    title: 'キャラクターのジャンプ力を変える',
    category: 'module',
    type: 'script',
    description: 'LocalScriptを使って、プレイヤーのジャンプ力を自由にカスタマイズする方法を学びます。',
    code: `-- LocalScript 内に記述してください
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

-- 数値を変えてジャンプ力を調整！（デフォルトは50）
humanoid.JumpPower = 100

print("ジャンプ力を設定しました: " .. humanoid.JumpPower)`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfUrl: null,
    isLocked: true,
    keyword: 'ジャンプ名人',
    unlockGuideUrl: 'https://youtube.com/watch?v=XXXX',
    unlockGuideText: 'このスクリプトのパスワードは、ジャンプカスタマイズ解説動画の最後で発表しています！',
  },
  {
    id: 'mod_003',
    title: 'コインを集めるゲームの作り方',
    category: 'module',
    type: 'script',
    description: 'タッチしたら消えるコインを作り、スコアを記録するゲームの基本システムを構築します。',
    code: `-- Script（コイン本体にアタッチ）
local coin = script.Parent
local debounce = false

coin.Touched:Connect(function(hit)
  if debounce then return end

  local character = hit.Parent
  local humanoid = character:FindFirstChildOfClass("Humanoid")

  if humanoid then
    debounce = true
    coin.Transparency = 1  -- コインを非表示に

    -- リーダーボードのスコアを加算
    local player = game.Players:GetPlayerFromCharacter(character)
    if player then
      local leaderstats = player:FindFirstChild("leaderstats")
      if leaderstats then
        leaderstats.Coins.Value += 1
      end
    end

    task.wait(3)         -- 3秒後に復活
    coin.Transparency = 0
    debounce = false
  end
end)`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfUrl: null,
    isLocked: true,
    keyword: 'コインゲット',
    unlockGuideUrl: 'https://youtube.com/watch?v=YYYY',
    unlockGuideText: 'このスクリプトのパスワードは、コインゲーム解説動画の最後で発表しています！',
  },
  {
    id: 'mod_004',
    title: 'リーダーボード（スコア表示）の作り方',
    category: 'module',
    type: 'script',
    description: '画面右上にプレイヤーごとのスコアを表示するリーダーボードを実装します。',
    code: `-- Script（ServerScriptServiceに配置）
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
  -- leaderstats フォルダを作成（これがリーダーボードの正式な仕組み）
  local leaderstats = Instance.new("Folder")
  leaderstats.Name = "leaderstats"
  leaderstats.Parent = player

  -- コイン数の値を追加
  local coins = Instance.new("IntValue")
  coins.Name = "Coins"
  coins.Value = 0
  coins.Parent = leaderstats

  -- ポイントの値を追加
  local points = Instance.new("IntValue")
  points.Name = "Points"
  points.Value = 0
  points.Parent = leaderstats
end)`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfUrl: null,
    isLocked: false,
    keyword: null,
    unlockGuideUrl: null,
    unlockGuideText: null,
  },

  // ── 特別講義 ───────────────────────────────────────────────
  {
    id: 'spec_001',
    title: '【特別講義】プロが教えるマップ設計術',
    category: 'special',
    type: 'video',
    description: 'プロのRobloxクリエイターが教える、プレイヤーを魅了するマップ設計の秘訣を大公開。動線・難易度曲線・視覚的誘導まで徹底解説。',
    code: null,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfUrl: null,
    isLocked: true,
    keyword: 'マップマスター',
    unlockGuideUrl: 'https://youtube.com/watch?v=ZZZZ',
    unlockGuideText: 'この特別講義のパスワードは、チャンネル概要欄の限定動画で発表しています！',
  },
  {
    id: 'spec_002',
    title: '【特別講義】Robuxで稼ぐマネタイズ完全ガイド',
    category: 'special',
    type: 'video',
    description: 'GamePass・Developer Productsの作り方から、課金アイテムの価格設定戦略まで。実際に収益を上げているゲームの仕組みを解説。',
    code: null,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfUrl: null,
    isLocked: false,
    keyword: null,
    unlockGuideUrl: null,
    unlockGuideText: null,
  },
  {
    id: 'spec_003',
    title: '【特別講義】バズるゲームのタイトル・アイコン戦略',
    category: 'special',
    type: 'video',
    description: '検索で見つけてもらえるタイトルの付け方と、クリックされるアイコンデザインの法則を実例と共に解説します。',
    code: null,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfUrl: null,
    isLocked: true,
    keyword: 'バズらせる',
    unlockGuideUrl: 'https://youtube.com/watch?v=SPEC3',
    unlockGuideText: 'このキーワードはマーケティング解説動画の途中で発表しています！',
  },

  // ── ロブ爺の特典箱 ─────────────────────────────────────────
  {
    id: 'bonus_001',
    title: 'Roblox Studio 基本操作マニュアル（タブ編）',
    category: 'bonus',
    type: 'pdf',
    description: '画面上部のタブ（Home / Model / Test / View）の使い方を図解でまとめたPDFマニュアルです。Studio初心者は必読！',
    code: null,
    videoUrl: null,
    pdfUrl: '/assets/pdfs/tab_manual.pdf',
    isLocked: false,
    keyword: null,
    unlockGuideUrl: null,
    unlockGuideText: null,
  },
  {
    id: 'bonus_002',
    title: '【限定PDF】よく使うLuaスクリプト チートシート100選',
    category: 'bonus',
    type: 'pdf',
    description: 'ゲーム制作でよく使うLuaコードを100個まとめた永久保存版。コピペして即使えるテンプレート集。',
    code: null,
    videoUrl: null,
    pdfUrl: '/assets/pdfs/cheatsheet.pdf',
    isLocked: true,
    keyword: 'ロブジイ',
    unlockGuideUrl: 'https://youtube.com/watch?v=AAAA',
    unlockGuideText: 'このチートシートのパスワードは、スクリプト入門動画の最後で発表しています！',
  },
  {
    id: 'bonus_003',
    title: 'ゲームアイデア発想テンプレート',
    category: 'bonus',
    type: 'pdf',
    description: 'ゲーム企画を整理するための思考テンプレートPDF。コンセプト・ターゲット・コア体験を言語化してアイデアを形にしよう。',
    code: null,
    videoUrl: null,
    pdfUrl: '/assets/pdfs/idea_template.pdf',
    isLocked: true,
    keyword: 'アイデアマン',
    unlockGuideUrl: 'https://youtube.com/watch?v=BBBB',
    unlockGuideText: 'このテンプレートのパスワードはゲームデザイン解説動画の中で発表しています！',
  },
  {
    id: 'bonus_004',
    title: '【限定動画】Studio裏技テクニック集',
    category: 'bonus',
    type: 'video',
    description: '知っている人だけが得をするStudioの便利機能・ショートカット・見落としがちな設定を凝縮した限定動画。',
    code: null,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdfUrl: null,
    isLocked: true,
    keyword: '裏技マスター',
    unlockGuideUrl: 'https://youtube.com/watch?v=CCCC',
    unlockGuideText: 'このキーワードはLINE読者限定で配信しています！LINE登録はプロフィールから。',
  },
]

// カテゴリ定義（新カテゴリ追加はここに追記するだけでメニューに自動反映）
export const categories = [
  {
    id: 'module',
    label: '📚 学習モジュール',
    icon: '📚',
    description: 'Roblox Studioの基礎から応用まで、ステップアップ形式で学べる講座。スクリプト付き。',
    color: 'from-blue-900 to-blue-800',
    border: 'border-blue-700',
  },
  {
    id: 'special',
    label: '⭐ 特別講義',
    icon: '⭐',
    description: 'プロクリエイターによる特別授業。マップ設計・マネタイズ・バズ戦略まで。',
    color: 'from-yellow-900 to-yellow-800',
    border: 'border-yellow-700',
  },
  {
    id: 'bonus',
    label: '🎁 ロブ爺の特典箱',
    icon: '🎁',
    description: 'PDF・限定動画・ツールを格納した宝箱。キーワードで次々とアンロックしよう！',
    color: 'from-purple-900 to-purple-800',
    border: 'border-purple-700',
  },
]
