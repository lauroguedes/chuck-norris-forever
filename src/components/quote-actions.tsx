import * as Tooltip from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Shuffle } from "lucide-react";

type QuoteActionsProps = {
  onRandomQuote: () => void;
  onCopyQuote: () => void;
  copied: boolean;
};

export function QuoteActions({ onRandomQuote, onCopyQuote, copied }: QuoteActionsProps) {
  const iconButtonClassName =
    "inline-flex size-11 items-center justify-center rounded-full border border-zinc-950/14 bg-zinc-950/92 text-white shadow-[0_18px_45px_rgba(15,23,42,0.24)] backdrop-blur-xl transition duration-200 hover:scale-[1.04] hover:bg-zinc-950 dark:border-white/16 dark:bg-zinc-950/88 dark:text-white dark:shadow-[0_18px_45px_rgba(0,0,0,0.42)] dark:hover:bg-black";

  return (
    <div className="flex items-center gap-2">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            onClick={onRandomQuote}
            className={iconButtonClassName}
            aria-label="Gerar frase aleatoria"
          >
            <Shuffle className="size-4" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={10}
            className="rounded-full border border-white/10 bg-zinc-950 px-3 py-2 text-xs text-white shadow-lg dark:bg-zinc-900"
          >
            Nova frase
            <Tooltip.Arrow className="fill-zinc-950 dark:fill-zinc-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            onClick={onCopyQuote}
            className={iconButtonClassName}
            aria-label="Copiar frase"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.svg
                  key="check"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 text-emerald-500"
                >
                  <path d="M20 6 9 17l-5-5" />
                </motion.svg>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  <Copy className="size-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={10}
            className="rounded-full border border-white/10 bg-zinc-950 px-3 py-2 text-xs text-white shadow-lg dark:bg-zinc-900"
          >
            Copiar frase
            <Tooltip.Arrow className="fill-zinc-950 dark:fill-zinc-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </div>
  );
}
