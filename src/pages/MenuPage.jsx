import { useNavigate } from 'react-router-dom'
import { categories, contents } from '../data/contents'
import { useUnlocked } from '../hooks/useUnlocked'

export default function MenuPage() {
  const navigate = useNavigate()
  const { isUnlocked } = useUnlocked()

  const getStats = (catId) => {
    const items = contents.filter(c => c.category === catId)
    const unlocked = items.filter(c => !c.isLocked || isUnlocked(c.id)).length
    return { total: items.length, unlocked }
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a]">
      {/* ヘッダー */}
      <header className="bg-[#1a1a2e] border-b border-[#0f3460] px-5 py-4 flex items-center gap-3 sticky top-0 z-40">
        <button
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >← トップへ</button>
        <span className="text-gray-600">|</span>
        <span className="text-lg">🧙‍♂️</span>
        <span className="font-bold text-white text-sm">ロブ爺のポータル</span>
      </header>

      <div className="max-w-3xl mx-auto px-5 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white mb-2">何を学ぶ？</h2>
          <p className="text-gray-500 text-sm">カテゴリを選んでスタート！</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {categories.map((cat) => {
            const { total, unlocked } = getStats(cat.id)
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/items/${cat.id}`)}
                className={`bg-[#16213e] border ${cat.border} hover:border-[#00a2ff] rounded-2xl p-7 text-left group hover:shadow-xl hover:shadow-[#00a2ff]/10 transition-all duration-250`}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-white text-base mb-2 leading-snug">
                  {cat.label.replace(/^[^\s]+ /, '')}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{cat.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#00a2ff] text-sm font-medium">開く →</span>
                  <span className="text-xs text-gray-600">{unlocked}/{total} 解放</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* ヒント */}
        <div className="bg-[#16213e] border border-yellow-600/30 rounded-xl p-5 flex gap-4 items-start">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-yellow-400 font-bold text-sm mb-1">キーワードの入手方法</p>
            <p className="text-gray-500 text-xs leading-relaxed">
              🔒 マークのコンテンツはYouTube動画の中でキーワードを発表しています。<br />
              動画を最後まで見てキーワードをゲットしよう！一度入力すれば次回以降も解放されたままです。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
