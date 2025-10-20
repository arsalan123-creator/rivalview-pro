import { Home, Building2, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Companies", href: "/companies", icon: Building2 },
  { name: "Analysis", href: "/analysis", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn("flex flex-col border-r border-sidebar-border bg-sidebar", className)}>
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <span className="text-sm font-bold text-primary-foreground">CI</span>
        </div>
        <span className="text-lg font-semibold text-sidebar-foreground">CompeteIQ</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-hover"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-xs font-medium text-primary-foreground">U</span>
          </div>
          <div className="flex-1 text-sm">
            <p className="font-medium text-sidebar-foreground">User1234</p>
            <p className="text-xs text-text-secondary">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
