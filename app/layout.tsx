import type { Metadata } from "next";
import "@fontsource/anton/latin-400.css";
import "@fontsource/kaushan-script/latin-400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Espaço Serrano | Futevôlei e Beach Tennis em Vinhedo",
  description: "Quadras de areia, aulas de futevôlei e beach tennis, alto rendimento, day use e comunidade em Vinhedo-SP.",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`,
    shortcut: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
