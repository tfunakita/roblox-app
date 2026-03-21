import { useState } from 'react'
import { gifts } from '../data/gifts'
import { useUnlocked } from '../hooks/useUnlocked'
import Confetti from '../components/Confetti'

const TYPE_LABEL = { video: '動画', pdf: 'PDF', script: 'スクリプト' }
const TYPE_ICON  = { video: '🎬', pdf: '📄', script: '💻' }

export default function PortalPage() {
  const { isUnlocked, unlock } = useUnlocked()
  const [modal, setModal]     = useState(null) // gift object
  const [input, setInput]     = useState('')
  const [error, setError]     = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [viewGift, setViewGift] = useState(null) // gift to view after unlock

  const getStatus = (g) => {
    if (g.status === 'coming_soon') return 'coming_soon'
    if (g.status === 'public') return 'public'
    if (g.status === 'locked' && isUnlocked(g.id)) return 'public'
    return 'locked'
  }

  const handleCardClick = (g) => {
    const s = getStatus(g)
    if (s === 'coming_soon') return
    if (s === 'locked') { setModal(g); setInput(''); setError(''); return }
    setViewGift(g)
  }

  const handleUnlock = () => {
    if (!modal) return
    if (input.trim() === modal.keyword) {
      unlock(modal.id)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      setViewGift(modal)
      setModal(null)
    } else {
      setError('キーワードが違います 🔒')
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] relative overflow-hidden">
      {showConfetti && <Confetti />}

      {/* 背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00a2ff]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e2231a]/8 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#00a2ff 1px, transparent 1px), linear-gradient(90deg, #00a2ff 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">

        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎁</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            <span className="text-[#00a2ff]">ロブ爺</span>の特典ポータル
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            YouTube動画を見てキーワードをゲットしよう！<br />
            特典がどんどんアンロックされます 🔓
          </p>
          {/* カウンター */}
          <div className="mt-4 inline-flex gap-4 bg-[#16213e] border border-[#0f3460] rounded-full px-6 py-2 text-xs">
            <span className="text-green-400">
              ✅ 公開中 {gifts.filter(g => getStatus(g) === 'public').length}
            </span>
            <span className="text-yellow-400">
              🔒 ロック中 {gifts.filter(g => getStatus(g) === 'locked').length}
            </span>
            <span className="text-purple-400">
              🔮 近日公開 {gifts.filter(g => g.status === 'coming_soon').length}
            </span>
          </div>
        </div>

        {/* カードグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gifts.map((g) => {
            const s = getStatus(g)
            return (
              <div
                key={g.id}
                onClick={() => handleCardClick(g)}
                className={`relative bg-[#16213e] border rounded-2xl p-5 transition-all duration-200
                  ${s === 'coming_soon'
                    ? 'border-purple-800/50 opacity-70 cursor-default'
                    : s === 'locked'
                    ? 'border-[#0f3460] hover:border-yellow-500/60 cursor-pointer hover:shadow-lg hover:shadow-yellow-900/20'
                    : 'border-[#0f3460] hover:border-[#00a2ff]/60 cursor-pointer hover:shadow-lg hover:shadow-blue-900/20'
                  }`}
              >
                {/* ステータスバッジ */}
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                    ${s === 'public'       ? 'bg-green-900/50 text-green-400 border border-green-700/50' :
                      s === 'locked'       ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/40' :
                      'bg-purple-900/30 text-purple-400 border border-purple-700/40'}`}>
                    {s === 'public' ? '✅ 公開中' : s === 'locked' ? '🔒 キーワード解放' : '🔮 近日公開'}
                  </span>
                  <span className="text-xs text-gray-600 bg-[#0f1629] px-2 py-1 rounded-full">
                    {TYPE_ICON[g.type]} {TYPE_LABEL[g.type]}
                  </span>
                </div>

                {/* コンテンツ */}
                <div className={s === 'coming_soon' ? 'blur-[2px]' : ''}>
                  <div className="text-3xl mb-2">{g.emoji}</div>
                  <h3 className="font-bold text-white text-sm mb-2 leading-snug">
                    {s === 'coming_soon' ? '？？？？？？？？' : g.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {s === 'coming_soon' ? '準備中です。もうしばらくお待ちください...' : g.description}
                  </p>
                </div>

                {/* アクション */}
                <div className="mt-4 text-xs font-medium">
                  {s === 'public'      && <span className="text-[#00a2ff]">タップして見る →</span>}
                  {s === 'locked'      && <span className="text-yellow-400">🔑 キーワードを入力して解放</span>}
                  {s === 'coming_soon' && <span className="text-purple-400">✨ 近日公開予定</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* キーワード入力モーダル */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setModal(null)}>
          <div className="bg-[#16213e] border border-[#0f3460] rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="text-center mb-5">
              <div className="text-4xl mb-2">{modal.emoji}</div>
              <h3 className="text-white font-bold text-base">{modal.title}</h3>
              {modal.linkedVideoTitle && (
                <p className="text-gray-500 text-xs mt-2">
                  💡 キーワードは「{modal.linkedVideoTitle}」で発表中
                  {modal.linkedVideoUrl && modal.linkedVideoUrl !== 'YOUR_YOUTUBE_URL' && (
                    <a href={modal.linkedVideoUrl} target="_blank" rel="noreferrer"
                      className="text-[#00a2ff] ml-1">→ 動画を見る</a>
                  )}
                </p>
              )}
            </div>
            <input
              type="text"
              value={input}
              onChange={e => { setInput(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleUnlock()}
              placeholder="キーワードを入力..."
              className="w-full bg-[#0f1629] border border-[#0f3460] text-white text-sm rounded-xl px-4 py-3 mb-2 outline-none focus:border-[#00a2ff] transition-colors"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
            <button onClick={handleUnlock}
              className="w-full bg-[#e2231a] hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors">
              🔓 解放する
            </button>
          </div>
        </div>
      )}

      {/* 特典表示モーダル */}
      {viewGift && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setViewGift(null)}>
          <div className="bg-[#16213e] border border-[#0f3460] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-[#0f3460] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{viewGift.emoji}</span>
                <h3 className="text-white font-bold text-sm">{viewGift.title}</h3>
              </div>
              <button onClick={() => setViewGift(null)} className="text-gray-500 hover:text-white text-xl">✕</button>
            </div>

            <div className="p-5">
              {viewGift.type === 'video' && viewGift.videoId && viewGift.videoId !== 'YOUR_VIDEO_ID' && viewGift.videoId !== 'YOUR_VIDEO_ID_2' ? (
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe src={`https://www.youtube.com/embed/${viewGift.videoId}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen title={viewGift.title} />
                </div>
              ) : viewGift.type === 'pdf' && viewGift.pdfUrl ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">📄</div>
                  <a href={viewGift.pdfUrl} target="_blank" rel="noreferrer"
                    className="bg-[#00a2ff] hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl inline-block transition-colors">
                    📥 PDFをダウンロード
                  </a>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  コンテンツを準備中です...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
