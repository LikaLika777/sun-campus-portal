import { useState, useEffect, useMemo } from "react";
import { kbArticles, type KBArticle } from "@/mocks/kb-articles";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, ChevronRight, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface KnowledgeDeflectionPanelProps {
  query: string;
  onQueryChange?: (q: string) => void;
  className?: string;
  showSearch?: boolean;
  maxResults?: number;
}

export function KnowledgeDeflectionPanel({
  query,
  onQueryChange,
  className,
  showSearch = false,
  maxResults = 3,
}: KnowledgeDeflectionPanelProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return kbArticles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((t) => t.includes(q))
      )
      .slice(0, maxResults);
  }, [query, maxResults]);

  if (results.length === 0 && !showSearch) return null;

  return (
    <div className={cn("space-y-3", className)}>
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Describe your question…"
            value={query}
            onChange={(e) => onQueryChange?.(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lightbulb className="h-4 w-4 text-accent" />
              <span className="font-medium">These articles might help:</span>
            </div>

            {results.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-sm transition-shadow border-border/60"
                  onClick={() =>
                    setExpanded(expanded === article.id ? null : article.id)
                  }
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <BookOpen className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">{article.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {article.summary}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 text-muted-foreground shrink-0 transition-transform",
                          expanded === article.id && "rotate-90"
                        )}
                      />
                    </div>
                    <AnimatePresence>
                      {expanded === article.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 pt-2 border-t text-sm text-muted-foreground"
                        >
                          {article.content}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
