import { useNavigate } from 'react-router-dom'

export default function TopPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col items-center justify-center relative overflow-hidden">

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

      <div className="relative z-10 text-center px-6 max-w-xl animate-fadeIn">
        <div className="text-8xl mb-6 animate-bounce">🧙‍♂️</div>

        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
          <span className="text-[#00a2ff]">ロブ爺</span>の<br />
          <span className="text-yellow-400">学習・特典ポータル</span>
        </h1>

        <p className="text-gray-300 text-base mb-2">
          Roblox Studioでゲームを作ろう！
        </p>
        <p className="text-gray-500 text-sm mb-10 leading-relaxed">
          動画を見てキーワードをゲット →<br />スクリプト・PDF・特典をアンロック 🔓
        </p>

        <button
          onClick={() => navigate('/menu')}
          className="bg-[#e2231a] hover:bg-red-700 active:scale-95 text-white font-black text-lg py-4 px-10 rounded-2xl shadow-2xl shadow-red-900/40 hover:shadow-red-900/60 transform hover:scale-105 transition-all duration-200"
        >
          🚀 学習・特典ページへ入る
        </button>

        <div className="mt-10 flex justify-center gap-6 text-gray-600 text-xs">
          <span>📚 学習モジュール</span>
          <span>⭐ 特別講義</span>
          <span>🎁 特典・PDF</span>
        </div>
      </div>
    </div>
  )
}
