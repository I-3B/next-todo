import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Next Todo",
    default: "Next Todo",
  },
  description: "Fullstack Next.js Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster closeButton richColors />
        </Providers>
      </body>
    </html>
  );
}
