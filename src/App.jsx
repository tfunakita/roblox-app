import { HashRouter, Routes, Route } from 'react-router-dom'
import { UnlockedProvider } from './hooks/useUnlocked'
import PortalPage from './pages/PortalPage'

export default function App() {
  return (
    <UnlockedProvider>
      <HashRouter>
        <Routes>
          <Route path="*" element={<PortalPage />} />
        </Routes>
      </HashRouter>
    </UnlockedProvider>
  )
}
