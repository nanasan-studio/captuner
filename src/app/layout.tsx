import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "Captuner 캡튜너",
  description: "글자 수 기반 자막 시간 / 프레임 계산기",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body
        style={{
          backgroundImage:
            "url(https://openreplay.com/patterns/dot-pattern.png)",
          backgroundRepeat: "repeat",
        }}
      >
        {children}
      </body>
    </html>
  );
}
