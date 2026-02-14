import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-apple-bg max-w-lg mx-auto relative">
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}
