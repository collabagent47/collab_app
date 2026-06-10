import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { DashboardPage } from './pages/DashboardPage'
import { NewExplorationPage } from './pages/NewExplorationPage'
import { EviarIntroPage } from './pages/EviarIntroPage'
import { ExplorationWorkspacePage } from './pages/ExplorationWorkspacePage'
import { SessionPreparationPage } from './pages/SessionPreparationPage'
import { PresentationModePage } from './pages/PresentationModePage'
import { AcademyPage } from './pages/AcademyPage'
import { KnowledgeBasePage } from './pages/KnowledgeBasePage'
import { QuickSessionPage } from './pages/QuickSessionPage'
import { LoginPage } from './pages/LoginPage'
import { UsersPage } from './pages/UsersPage'
import { useAuthStore } from './stores/authStore'

export default function App() {
  const initFromStorage = useAuthStore((s) => s.initFromStorage)

  useEffect(() => {
    initFromStorage()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/explorations/:id/present" element={<PresentationModePage />} />

        {/* Rutas protegidas — requieren autenticación */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/explorations/new" element={<NewExplorationPage />} />
            <Route path="/explorations/:id/intro" element={<EviarIntroPage />} />
            <Route path="/explorations/:id" element={<ExplorationWorkspacePage />} />
            <Route path="/explorations/:id/preparation" element={<SessionPreparationPage />} />
            <Route path="/academy" element={<AcademyPage />} />
            <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
            <Route path="/session/quick" element={<QuickSessionPage />} />
            <Route path="/settings/users" element={<UsersPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
