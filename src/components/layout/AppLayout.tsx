import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 max-w-lg mx-auto relative">
      <main className="pb-16">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}
