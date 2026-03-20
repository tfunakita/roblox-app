import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUnlocked } from '../hooks/useUnlocked'
import KeywordModal from './KeywordModal'

const TYPE_BADGE = {
  script: { label: '💻 スクリプト', cls: 'bg-green-800 text-green-200' },
  video:  { label: '🎬 動画',       cls: 'bg-red-800 text-red-200' },
  pdf:    { label: '📄 PDF',        cls: 'bg-orange-800 text-orange-200' },
}

export default function ContentCard({ item }) {
  const navigate = useNavigate()
  const { isUnlocked } = useUnlocked()
  const [showModal, setShowModal] = useState(false)

  const unlocked = !item.isLocked || isUnlocked(item.id)
  const badge = TYPE_BADGE[item.type] || { label: item.type, cls: 'bg-gray-700 text-gray-300' }

  const handleClick = () => {
    if (unlocked) navigate(`/detail/${item.id}`)
    else setShowModal(true)
  }

  return (
    <>
      <div
        onClick={handleClick}
        className="relative bg-[#16213e] border border-[#0f3460] rounded-2xl p-5 cursor-pointer group hover:border-[#00a2ff] hover:shadow-xl hover:shadow-[#00a2ff]/15 transition-all duration-250 flex flex-col"
      >
        {/* ロックオーバーレイ */}
        {!unlocked && (
          <div className="absolute inset-0 bg-black/55 rounded-2xl flex flex-col items-center justify-center z-10 group-hover:bg-black/45 transition-colors">
            <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-200">🔒</div>
            <span className="text-xs text-gray-300 bg-black/60 px-3 py-1 rounded-full">
              クリックしてキーワードを入力
            </span>
          </div>
        )}

        {/* 解放済みバッジ */}
        {unlocked && item.isLocked && (
          <span className="absolute top-3 right-3 text-base">🔓</span>
        )}

        {/* タイプバッジ */}
        <span className={`inline-block ${badge.cls} text-xs font-bold px-2.5 py-1 rounded-full mb-3 w-fit`}>
          {badge.label}
        </span>

        <h3 className={`font-bold text-base mb-2 leading-snug ${unlocked ? 'text-white' : 'text-gray-400'}`}>
          {item.title}
        </h3>

        <p className={`text-sm leading-relaxed flex-1 ${unlocked ? 'text-gray-400' : 'text-gray-600'}`}>
          {item.description}
        </p>

        <div className="mt-4 text-sm font-medium flex items-center gap-1">
          {unlocked
            ? <span className="text-[#00a2ff]">詳細を見る →</span>
            : <span className="text-yellow-500">🔑 キーワードで解放</span>
          }
        </div>
      </div>

      {showModal && (
        <KeywordModal
          item={item}
          onClose={() => setShowModal(false)}
          onUnlocked={() => navigate(`/detail/${item.id}`)}
        />
      )}
    </>
  )
}
