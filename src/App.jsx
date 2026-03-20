import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UnlockedProvider } from './hooks/useUnlocked'
import PortalPage from './pages/PortalPage'

export default function App() {
  return (
    <UnlockedProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PortalPage />} />
        </Routes>
      </BrowserRouter>
    </UnlockedProvider>
  )
}
