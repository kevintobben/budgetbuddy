import {
  BanknoteArrowDown,
  HomeIcon,
  WalletCards,
  BanknoteArrowUp,
  Settings,
} from "lucide-react"
import { NavLink } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Sidebar menu items
const items = [
  {
    title: "Home",
    to: "/",
    icon: HomeIcon,
  },
  {
    title: "Income",
    to: "/income",
    icon: BanknoteArrowUp,
  },
  {
    title: "Expenses",
    to: "/expenses",
    icon: BanknoteArrowDown,
  },
  {
    title: "Vaste lasten",
    to: "/vastelasten",
    icon: WalletCards,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigeer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 ${
                          isActive ? "text-primary font-semibold" : "text-muted-foreground"
                        }`
                      }
                    >
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
