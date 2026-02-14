import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardPage } from "./components/dashboard/DashboardPage";
import { WeightPage } from "./components/weight/WeightPage";
import { MealsPage } from "./components/meals/MealsPage";
import { HydrationPage } from "./components/hydration/HydrationPage";
import { ChartsPage } from "./components/charts/ChartsPage";
import { SettingsPage } from "./components/settings/SettingsPage";
import { OnboardingPage } from "./components/onboarding/OnboardingPage";
import { useAppData } from "./hooks/useAppData";

function AppRoutes() {
  const { data } = useAppData();
  const hasProfile = data.profile !== null;

  if (!hasProfile) {
    return (
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/weight" element={<WeightPage />} />
        <Route path="/meals" element={<MealsPage />} />
        <Route path="/hydration" element={<HydrationPage />} />
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
