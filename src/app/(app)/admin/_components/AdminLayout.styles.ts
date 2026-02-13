"use client";

import styled from "@emotion/styled";

const SIDEBAR_WIDTH = 260;
const TOPBAR_HEIGHT = 56;
const MOBILE_BREAKPOINT = 768;

export const LayoutRoot = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-grey-50, #f9fafb);

  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: row;
  }
`;

export const Sidebar = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: ${SIDEBAR_WIDTH}px;
  height: 100vh;
  background: var(--color-white, #fff);
  border-right: 1px solid var(--color-grey-200, #e5e8eb);
  display: flex;
  flex-direction: column;
  transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
  transition: transform 0.2s ease-in-out;
  box-shadow: ${({ $open }) =>
    $open ? "4px 0 12px rgba(0,0,0,0.08)" : "none"};

  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    position: relative;
    transform: none;
    box-shadow: none;
    flex-shrink: 0;
  }
`;

export const SidebarHeader = styled.div`
  padding: 14px 20px;
  border-bottom: 1px solid var(--color-grey-200, #e5e8eb);
  min-height: ${TOPBAR_HEIGHT}px;
  display: flex;
  align-items: center;

  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    border-bottom: 1px solid var(--color-grey-200, #e5e8eb);
  }
`;

export const SidebarLogo = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-grey-900, #191f28);
`;

export const SidebarNav = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
`;

export const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 12px;
`;

export const NavItem = styled.li`
  margin: 0;
`;

export const NavLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  color: ${({ $active }) =>
    $active
      ? "var(--color-blue-600, #2272eb)"
      : "var(--color-grey-700, #4e5968)"};
  background: ${({ $active }) =>
    $active ? "var(--color-blue-50, #e8f3ff)" : "transparent"};
  font-size: 0.9375rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  text-decoration: none;
  transition:
    background 0.15s,
    color 0.15s;

  &:hover {
    background: ${({ $active }) =>
      $active
        ? "var(--color-blue-50, #e8f3ff)"
        : "var(--color-grey-100, #f2f4f6)"};
    color: ${({ $active }) =>
      $active
        ? "var(--color-blue-700, #1b64da)"
        : "var(--color-grey-800, #333d4b)"};
  }
`;

export const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-left: 0;

  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    margin-left: 0;
  }
`;

export const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  height: ${TOPBAR_HEIGHT}px;
  padding: 0 16px 0 20px;
  background: var(--color-white, #fff);
  border-bottom: 1px solid var(--color-grey-200, #e5e8eb);
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--color-grey-700, #4e5968);
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;

  &:hover {
    background: var(--color-grey-100, #f2f4f6);
    color: var(--color-grey-900, #191f28);
  }

  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;

export const TopBarTitle = styled.h1`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-grey-900, #191f28);
`;

export const Content = styled.main`
  flex: 1;
  padding: 24px 20px;
  overflow-x: auto;

  @media (max-width: ${MOBILE_BREAKPOINT - 1}px) {
    padding: 16px;
  }
`;

export const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.4);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  transition:
    opacity 0.2s,
    visibility 0.2s;

  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;
