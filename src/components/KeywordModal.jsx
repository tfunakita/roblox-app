import { useState, useRef, useEffect } from 'react'
import { useUnlocked } from '../hooks/useUnlocked'
import Confetti from './Confetti'

export default function KeywordModal({ item, onClose, onUnlocked }) {
  const [input, setInput]     = useState('')
  const [error, setError]     = useState(false)
  const [success, setSuccess] = useState(false)
  const { unlock } = useUnlocked()
  const boxRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const triggerShake = () => {
    const el = boxRef.current
    if (!el) return
    el.classList.add('animate-shake')
    setTimeout(() => el.classList.remove('animate-shake'), 400)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === item.keyword) {
      unlock(item.id)
      setSuccess(true)
      setTimeout(() => {
        onUnlocked?.()
        onClose()
      }, 2200)
    } else {
      setError(true)
      triggerShake()
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <>
      <Confetti active={success} />

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
        onClick={(e) => { if (e.target === e.currentTarget && !success) onClose() }}
      >
        <div
          ref={boxRef}
          className="relative bg-[#16213e] border border-[#0f3460] rounded-2xl p-8 max-w-md w-full shadow-2xl animate-slideUp"
        >
          {success ? (
            /* 成功表示 */
            <div className="text-center animate-pop py-4">
              <div className="text-7xl mb-4">🎉</div>
              <h2 className="text-2xl font-black text-yellow-400 mb-2">解放されました！</h2>
              <p className="text-gray-300 text-sm">「{item.title}」<br />のロックが外れました！</p>
              <div className="text-5xl mt-4">🔓</div>
            </div>
          ) : (
            <>
              {/* 閉じるボタン */}
              <button
                onClick={onClose}
                className="absolute top-4 right-5 text-gray-500 hover:text-white text-xl transition-colors"
              >✕</button>

              {/* ヘッダー */}
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🔒</div>
                <h2 className="text-xl font-bold text-white mb-1">キーワードが必要です</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  「{item.title}」を閲覧するには<br />キーワードを入力してください
                </p>
              </div>

              {/* キーワード入手案内 */}
              {item.unlockGuideText && (
                <div className="bg-[#0f3460]/60 border border-[#00a2ff]/30 rounded-xl p-4 mb-5">
                  <p className="text-[#00a2ff] text-sm leading-relaxed mb-3">
                    💡 {item.unlockGuideText}
                  </p>
                  {item.unlockGuideUrl && (
                    <a
                      href={item.unlockGuideUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#e2231a] hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                      🎬 動画でキーワードを入手する
                    </a>
                  )}
                </div>
              )}

              {/* 入力フォーム */}
              <form onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="キーワードを入力..."
                  className={`w-full bg-[#0d0d1a] border rounded-xl px-4 py-3 text-white text-center text-lg tracking-widest focus:outline-none transition-colors mb-3 ${
                    error ? 'border-red-500 bg-red-900/20' : 'border-[#0f3460] focus:border-[#00a2ff]'
                  }`}
                />
                {error && (
                  <p className="text-red-400 text-sm text-center mb-3 animate-fadeIn">
                    ❌ キーワードが違います。もう一度試してみてください！
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-full bg-[#00a2ff] hover:bg-blue-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
                >
                  🔓 アンロックする
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
