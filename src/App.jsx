import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UnlockedProvider } from './hooks/useUnlocked'
import TopPage from './pages/TopPage'
import MenuPage from './pages/MenuPage'
import ItemListPage from './pages/ItemListPage'
import DetailPage from './pages/DetailPage'
import GiftPage from './pages/GiftPage'
import PortalPage from './pages/PortalPage'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <UnlockedProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/items/:category" element={<ItemListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/gift" element={<GiftPage />} />
          <Route path="/portal" element={<PortalPage />} />
          <Route path="*" element={<TopPage />} />
        </Routes>
      </BrowserRouter>
    </UnlockedProvider>
  )
}
