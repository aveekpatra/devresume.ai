import "@v1/ui/globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@v1/ui/utils";
import { ConvexClientProvider } from "../convex-client-provider";
import { GlobalSidebar } from "./_components/global-sidebar";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang={params.locale} suppressHydrationWarning>
        <body className={cn(inter.className, "antialiased")}>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                <GlobalSidebar />
                <main className="flex-1 ml-16 overflow-hidden">
                  {children}
                </main>
              </div>
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
