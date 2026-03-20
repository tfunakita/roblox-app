import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { contents } from '../data/contents'
import { useUnlocked } from '../hooks/useUnlocked'

// ─── パターンA: スクリプト ───────────────────────────────────
function ScriptView({ item }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(item.code || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 左: 動画 + 解説 */}
      <div className="flex flex-col gap-5">
        {item.videoUrl && (
          <div className="aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              src={item.videoUrl}
              title={item.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}
        <div className="bg-[#16213e] rounded-xl p-5 border border-[#0f3460]">
          <h3 className="font-bold text-white text-sm mb-2">📋 解説</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
        </div>
      </div>

      {/* 右: コード */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">💻 Luaスクリプト</h3>
          <button
            onClick={handleCopy}
            className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-all ${
              copied
                ? 'bg-green-700 text-white'
                : 'bg-[#0f3460] text-[#00a2ff] hover:bg-[#00a2ff] hover:text-white'
            }`}
          >
            {copied ? '✅ コピー完了！' : '📋 コピーする'}
          </button>
        </div>
        <div className="code-block flex-1 min-h-64 max-h-[560px] overflow-y-auto">
          {item.code}
        </div>
      </div>
    </div>
  )
}

// ─── パターンC: 動画のみ ─────────────────────────────────────
function VideoView({ item }) {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
        <iframe
          src={item.videoUrl}
          title={item.title}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
      <div className="bg-[#16213e] rounded-xl p-6 border border-[#0f3460]">
        <h3 className="font-bold text-white mb-2">📋 内容</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  )
}

// ─── パターンB: PDF ──────────────────────────────────────────
function PdfView({ item }) {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5">
      <div className="bg-[#16213e] rounded-xl p-6 border border-[#0f3460] flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-gray-300 text-sm leading-relaxed flex-1">{item.description}</p>
        <a
          href={item.pdfUrl}
          download
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm py-2.5 px-5 rounded-xl transition-colors whitespace-nowrap"
        >
          📥 ダウンロード
        </a>
      </div>
      {item.pdfUrl && (
        <div
          className="bg-[#0d0d1a] rounded-xl overflow-hidden border border-[#0f3460]"
          style={{ height: '72vh' }}
        >
          <iframe src={item.pdfUrl} title={item.title} className="w-full h-full" />
        </div>
      )}
    </div>
  )
}

// ─── メインページ ────────────────────────────────────────────
const TYPE_BADGE = {
  script: { label: '💻 スクリプト', cls: 'bg-green-800 text-green-200' },
  video:  { label: '🎬 動画',       cls: 'bg-red-800 text-red-200' },
  pdf:    { label: '📄 PDF',        cls: 'bg-orange-800 text-orange-200' },
}

export default function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isUnlocked } = useUnlocked()

  const item = contents.find(c => c.id === id)

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-gray-400 mb-4">コンテンツが見つかりません</p>
          <button onClick={() => navigate('/menu')} className="text-[#00a2ff] hover:underline text-sm">
            メニューへ戻る
          </button>
        </div>
      </div>
    )
  }

  // ロックされていてまだ解放されていない場合はリダイレクト
  if (item.isLocked && !isUnlocked(item.id)) {
    navigate(`/items/${item.category}`)
    return null
  }

  const badge = TYPE_BADGE[item.type] || { label: item.type, cls: 'bg-gray-700 text-gray-300' }

  return (
    <div className="min-h-screen bg-[#0d0d1a]">
      {/* ヘッダー */}
      <header className="bg-[#1a1a2e] border-b border-[#0f3460] px-5 py-3 flex items-center gap-3 sticky top-0 z-40">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >← 戻る</button>
        <span className={`${badge.cls} text-xs font-bold px-2.5 py-1 rounded-full`}>
          {badge.label}
        </span>
        <h1 className="font-bold text-white text-sm truncate">{item.title}</h1>
        {item.isLocked && (
          <span className="ml-auto text-green-400 text-sm whitespace-nowrap">🔓 解放済み</span>
        )}
      </header>

      <div className="max-w-6xl mx-auto px-5 py-8">
        <h2 className="text-xl sm:text-2xl font-black text-white mb-8">{item.title}</h2>

        {item.type === 'script' && <ScriptView item={item} />}
        {item.type === 'video'  && <VideoView  item={item} />}
        {item.type === 'pdf'    && <PdfView    item={item} />}
      </div>
    </div>
  )
}
