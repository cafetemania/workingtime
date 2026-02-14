import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";

export function AppLayout() {
  return (
    <div className="min-h-screen max-w-lg mx-auto relative" style={{ backgroundColor: 'var(--color-bg)' }}>
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}
