import type { Metadata } from "next";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Component Guide",
  description: "가이드 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    (function() {
      try {
        var key = 'theme';
        var saved = localStorage.getItem(key); // 'light' | 'dark' | 'system' | null
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // var resolved = saved === 'dark' ? 'dark' : saved === 'light' ? 'light' : (prefersDark ? 'dark' : 'light');
        var resolved = 'light';
        document.documentElement.setAttribute('data-theme', resolved);
        document.documentElement.style.colorScheme = resolved;
      } catch (e) {}
    })();
  `;
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
