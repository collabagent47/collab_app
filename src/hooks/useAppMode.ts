import { useAppStore } from '../stores/appStore'

export function useAppMode() {
  const { userMode, isPresentationMode, setUserMode, togglePresentationMode } = useAppStore()
  return { userMode, isPresentationMode, setUserMode, togglePresentationMode }
}
