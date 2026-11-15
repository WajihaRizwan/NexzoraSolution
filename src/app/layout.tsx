import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nexzora Solution | Digital Innovation & Technology",
    template: "%s | Nexzora",
  },
  description: "Nexzora Solution builds thoughtful digital experiences through AI, software development, creative design and modern technology. Your Vision, Our Innovation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
