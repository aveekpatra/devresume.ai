import "@v1/ui/globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { TooltipProvider } from "@v1/ui/tooltip";
import { cn } from "@v1/ui/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ConvexClientProvider } from "../convex-client-provider";

export const metadata: Metadata = {
  title: "DevResume.ai",
  description: "Create professional CVs and cover letters with AI assistance",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning className="dark">
        <body
          className={cn(
            `${GeistSans.variable} ${GeistMono.variable}`,
            "antialiased bg-black text-white min-h-screen",
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={0}>
              <ConvexClientProvider>{children}</ConvexClientProvider>
              <Toaster richColors />
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
