export default function GiftPage() {
  // ここに完全攻略動画のYouTube URLを入れる
  const VIDEO_ID = 'YOUR_VIDEO_ID_HERE'
  const videoUrl = `https://www.youtube.com/embed/${VIDEO_ID}`

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col items-center justify-center relative overflow-hidden px-4">

      {/* 背景グロー */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00a2ff]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e2231a]/8 rounded-full blur-3xl" />
      </div>

      {/* グリッドパターン */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#00a2ff 1px, transparent 1px), linear-gradient(90deg, #00a2ff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl text-center">

        {/* ヘッダー */}
        <div className="mb-8">
          <div className="text-6xl mb-4">🎁</div>
          <div className="inline-block bg-[#e2231a]/20 border border-[#e2231a]/40 text-[#e2231a] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            YouTube視聴者限定特典
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
            Roblox Studio<br />
            <span className="text-[#00a2ff]">完全攻略動画</span>プレゼント
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            チャンネル登録＆動画を見てくれたあなたへの<br />特別プレゼントです。ゆっくり楽しんでください！
          </p>
        </div>

        {/* 動画エリア */}
        <div className="bg-[#16213e] border border-[#0f3460] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 mb-6">
          {VIDEO_ID === 'YOUR_VIDEO_ID_HERE' ? (
            // プレースホルダー
            <div className="aspect-video flex flex-col items-center justify-center bg-[#0f1629] text-gray-600">
              <div className="text-5xl mb-3">🎬</div>
              <p className="text-sm">動画URLを設定してください</p>
            </div>
          ) : (
            <div className="aspect-video">
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Roblox完全攻略動画"
              />
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="flex justify-center gap-2 text-gray-600 text-xs">
          <span>🧙‍♂️ ロブ爺のRoblox Studio講座</span>
        </div>

      </div>
    </div>
  )
}
