import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { NewExplorationPage } from './pages/NewExplorationPage'
import { EviarIntroPage } from './pages/EviarIntroPage'
import { ExplorationWorkspacePage } from './pages/ExplorationWorkspacePage'
import { SessionPreparationPage } from './pages/SessionPreparationPage'
import { PresentationModePage } from './pages/PresentationModePage'
import { AcademyPage } from './pages/AcademyPage'
import { KnowledgeBasePage } from './pages/KnowledgeBasePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Presentation mode: vista limpia sin shell */}
        <Route path="/explorations/:id/present" element={<PresentationModePage />} />

        {/* Todas las demás rutas usan el AppShell con sidebar + topbar */}
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/explorations/new" element={<NewExplorationPage />} />
          <Route path="/explorations/:id/intro" element={<EviarIntroPage />} />
          <Route path="/explorations/:id" element={<ExplorationWorkspacePage />} />
          <Route path="/explorations/:id/preparation" element={<SessionPreparationPage />} />
          <Route path="/academy" element={<AcademyPage />} />
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
