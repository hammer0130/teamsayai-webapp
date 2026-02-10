"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutRoot,
  Sidebar,
  SidebarHeader,
  SidebarLogo,
  SidebarNav,
  NavList,
  NavItem,
  NavLink,
  MainWrapper,
  TopBar,
  MenuButton,
  TopBarTitle,
  Content,
  Overlay,
} from "./AdminLayout.styles";

const ADMIN_NAV = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/users", label: "사용자 관리" },
] as const;

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((o) => !o);

  const pageTitle =
    ADMIN_NAV.find((item) => item.href === pathname)?.label ?? "관리자";

  return (
    <LayoutRoot>
      <Overlay $open={sidebarOpen} onClick={closeSidebar} aria-hidden />
      <Sidebar $open={sidebarOpen}>
        <SidebarHeader>
          <SidebarLogo>관리자</SidebarLogo>
        </SidebarHeader>
        <SidebarNav>
          <NavList>
            {ADMIN_NAV.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <NavItem key={item.href}>
                  <NavLink
                    as={Link}
                    href={item.href}
                    $active={isActive}
                    onClick={closeSidebar}
                  >
                    {item.label}
                  </NavLink>
                </NavItem>
              );
            })}
          </NavList>
        </SidebarNav>
      </Sidebar>
      <MainWrapper>
        <TopBar>
          <MenuButton
            type="button"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </MenuButton>
          <TopBarTitle>{pageTitle}</TopBarTitle>
        </TopBar>
        <Content>{children}</Content>
      </MainWrapper>
    </LayoutRoot>
  );
}
