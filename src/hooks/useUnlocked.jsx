import { createContext, useContext, useState } from 'react'

const Ctx = createContext(null)

export function UnlockedProvider({ children }) {
  const [unlocked, setUnlocked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('unlockedItems') || '[]') }
    catch { return [] }
  })

  const unlock = (id) => {
    setUnlocked(prev => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      localStorage.setItem('unlockedItems', JSON.stringify(next))
      return next
    })
  }

  const isUnlocked = (id) => unlocked.includes(id)

  return <Ctx.Provider value={{ unlock, isUnlocked }}>{children}</Ctx.Provider>
}

export function useUnlocked() {
  return useContext(Ctx)
}
