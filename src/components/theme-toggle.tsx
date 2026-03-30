import { MoonStar, SunMedium } from "lucide-react";
import { cn } from "../lib/utils";

type Theme = "light" | "dark";

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full border text-sm font-medium transition",
        "border-zinc-950/10 bg-white/72 text-zinc-950 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md hover:bg-white",
        "dark:border-white/15 dark:bg-white/8 dark:text-zinc-100 dark:hover:border-white/25 dark:hover:bg-white/12",
      )}
      aria-label={`Alternar para modo ${theme === "dark" ? "claro" : "escuro"}`}
    >
      {theme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
    </button>
  );
}
