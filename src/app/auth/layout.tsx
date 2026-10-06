import { ReactNode } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-muted/20 px-4 py-12 antialiased">
      {/* Top Right Toggle */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <ModeToggle />
      </div>

      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background">
          <BookOpen className="h-4 w-4" />
        </span>
        <span className="text-lg font-semibold tracking-tight">AskMyDocs</span>
      </Link>

      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
