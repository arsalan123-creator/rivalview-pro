import { Sidebar } from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar className="w-64" />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
