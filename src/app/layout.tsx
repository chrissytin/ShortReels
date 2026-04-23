import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShortReels — AI Skits You Can't Stop Watching",
  description: "Watch hilarious AI-generated skits and short reels. Subscribe for unlimited premium content.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
