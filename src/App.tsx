import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { QuoteActions } from "./components/quote-actions";
import { ThemeToggle } from "./components/theme-toggle";
import { chuckImages, type ChuckImage } from "./data/images";
import { quotes } from "./data/quotes";
import { getRandomItem } from "./lib/utils";
import { Analytics } from "@vercel/analytics/react";

type Theme = "light" | "dark";
const QUOTE_SESSION_KEY = "chuck-norris-seen-quotes";

function getInitialTheme(): Theme {
  const root = document.documentElement;
  return root.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  localStorage.setItem("chuck-norris-theme", theme);
}

function renderQuoteWithAccent(quote: string) {
  return quote.split(/(Chuck Norris)/g).map((part, index) => {
    if (part === "Chuck Norris") {
      return (
        <strong
          key={`${part}-${index}`}
          className="mx-[0.08em] inline-block font-[var(--font-accent)] text-[1.08em] font-semibold italic tracking-[0.01em] text-zinc-950 dark:text-white"
        >
          {part}
        </strong>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function readSeenQuotes() {
  try {
    const rawValue = window.sessionStorage.getItem(QUOTE_SESSION_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeSeenQuotes(seenQuotes: string[]) {
  window.sessionStorage.setItem(QUOTE_SESSION_KEY, JSON.stringify(seenQuotes));
}

function pickSessionQuote(currentQuote?: string) {
  const allQuotes: string[] = [...quotes];
  const seenQuotes = readSeenQuotes().filter((quote) => allQuotes.includes(quote));
  const availableQuotes = allQuotes.filter((quote) => !seenQuotes.includes(quote));

  const pool = availableQuotes.length > 0 ? availableQuotes : allQuotes;
  const randomPool = currentQuote && pool.length > 1 ? pool.filter((quote) => quote !== currentQuote) : pool;
  const nextQuote = getRandomItem(randomPool.length > 0 ? randomPool : pool);

  const nextSeenQuotes = availableQuotes.length > 0 ? [...seenQuotes, nextQuote] : [nextQuote];
  writeSeenQuotes(nextSeenQuotes);

  return nextQuote;
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentImage, setCurrentImage] = useState<ChuckImage>(() => getRandomItem(chuckImages));
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    setCurrentQuote(pickSessionQuote());
  }, []);

  useEffect(() => {
    if (!copyFeedback) {
      return;
    }

    const timeout = window.setTimeout(() => setCopyFeedback(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [copyFeedback]);

  function handleRandomQuote() {
    const nextQuote = pickSessionQuote(currentQuote);
    setCurrentQuote(nextQuote);
  }

  async function handleCopyQuote() {
    try {
      await navigator.clipboard.writeText(currentQuote);
      setCopyFeedback(true);
    } catch {
      setCopyFeedback(false);
    }
  }

  function handleThemeToggle() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  function handleImageError() {
    setCurrentImage({
      src: "/chuck-norris.jpg",
      alt: "Chuck Norris",
    });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(197,167,131,0.18),_transparent_28%),linear-gradient(180deg,_#f6f1e7_0%,_#efe7da_52%,_#e6dbc8_100%)] text-zinc-950 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.14),_transparent_22%),linear-gradient(180deg,_#0b0b0c_0%,_#111214_45%,_#191513_100%)] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20 dark:opacity-10" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex justify-end">
          <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
        </header>

        <main className="flex flex-1 items-center justify-center">
          <section className="w-full max-w-xl">
            <div className="mx-auto flex flex-col items-center">
              <div className="relative w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-zinc-950/8 bg-white/70 p-3 shadow-[0_30px_100px_rgba(39,24,16,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-white/6 dark:shadow-[0_30px_100px_rgba(0,0,0,0.34)] sm:max-w-[360px]">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-zinc-950/15 to-transparent dark:via-white/10" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <motion.img
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.alt}
                onError={handleImageError}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="h-full w-full object-cover"
              />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
                </div>
              </div>

              <div className="group mt-7 w-full max-w-lg">
                <div className="relative flex items-center justify-center">
                  <Quote className="pointer-events-none absolute left-8 top-1/2 z-0 size-16 -translate-y-1/2 text-zinc-950/10 dark:text-white/10 sm:left-10 sm:size-20" />
                  <div className="max-w-md flex-1 text-center opacity-70">
                    <AnimatePresence mode="wait">
                      <motion.blockquote
                        key={currentQuote}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="relative z-10 px-8 text-balance text-2xl font-extralight leading-[1.12] tracking-[-0.05em] text-zinc-950 transition duration-200 dark:text-zinc-200 sm:px-10 sm:text-3xl sm:group-hover:scale-[0.995] sm:group-hover:blur-[1.5px]"
                      >
                        {renderQuoteWithAccent(currentQuote)}
                      </motion.blockquote>
                    </AnimatePresence>
                  </div>

                  <div className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center transition duration-200 sm:flex sm:opacity-0 sm:translate-y-4 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
                    <motion.div
                      initial={false}
                      className="pointer-events-auto relative z-20"
                    >
                      <QuoteActions
                        onRandomQuote={handleRandomQuote}
                        onCopyQuote={handleCopyQuote}
                        copied={copyFeedback}
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="mt-5 flex justify-center sm:hidden">
                  <QuoteActions
                    onRandomQuote={handleRandomQuote}
                    onCopyQuote={handleCopyQuote}
                    copied={copyFeedback}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-8 flex justify-end">
          <a
            href="https://lauroguedes.dev"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-zinc-200"
          >
            Created by Lauro Guedes
          </a>
        </footer>
      </div>
      <Analytics />
    </div>
  );
}
