import { useParams, useNavigate } from 'react-router-dom'
import { contents, categories } from '../data/contents'
import { useUnlocked } from '../hooks/useUnlocked'
import ContentCard from '../components/ContentCard'

export default function ItemListPage() {
  const { category } = useParams()
  const navigate = useNavigate()
  const { isUnlocked } = useUnlocked()

  const currentCat = categories.find(c => c.id === category)
  const items = contents.filter(item => item.category === category)
  const unlockedCount = items.filter(i => !i.isLocked || isUnlocked(i.id)).length

  return (
    <div className="min-h-screen bg-[#0d0d1a]">
      {/* ヘッダー */}
      <header className="bg-[#1a1a2e] border-b border-[#0f3460] sticky top-0 z-40">
        <div className="px-5 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/menu')}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >← メニューへ</button>
          <span className="text-gray-600">|</span>
          <span className="text-base">{currentCat?.icon}</span>
          <span className="font-bold text-white text-sm">{currentCat?.label}</span>
        </div>

        {/* カテゴリタブ */}
        <div className="px-5 flex gap-1 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate(`/items/${cat.id}`)}
              className={`py-2.5 px-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                cat.id === category
                  ? 'border-[#00a2ff] text-[#00a2ff]'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {cat.icon} {cat.label.replace(/^[^\s]+ /, '')}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-8">
        {/* 統計 */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">{currentCat?.description}</p>
          <span className="text-xs text-gray-600 bg-[#16213e] px-3 py-1 rounded-full border border-[#0f3460] whitespace-nowrap ml-4">
            🔓 {unlockedCount}/{items.length} 解放済み
          </span>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(item => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-600">
            <div className="text-5xl mb-4">📭</div>
            <p>このカテゴリにはまだコンテンツがありません</p>
            <p className="text-xs mt-2">data/contents.js に追記すると自動で表示されます</p>
          </div>
        )}
      </div>
    </div>
  )
}
