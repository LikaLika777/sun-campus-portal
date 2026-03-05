import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, X, RotateCcw, User, Users } from "lucide-react";
import { useDemo } from "@/contexts/DemoContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DemoToggle() {
  const { isActive, currentPersona, viewMode, allPersonas, setPersona, setViewMode, resetData } = useDemo();
  const [open, setOpen] = useState(false);

  if (!isActive) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 w-80 rounded-lg border bg-card p-4 shadow-lg"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-heading text-sm font-semibold">Demo Mode</h3>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* View mode toggle */}
            <div className="mb-3 flex gap-1 rounded-md bg-muted p-1">
              <button
                className={cn("flex-1 rounded-sm px-3 py-1.5 text-xs font-medium transition-colors", viewMode === "student" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground")}
                onClick={() => setViewMode("student")}
              >
                <User className="mr-1 inline h-3 w-3" /> Student
              </button>
              <button
                className={cn("flex-1 rounded-sm px-3 py-1.5 text-xs font-medium transition-colors", viewMode === "staff" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground")}
                onClick={() => setViewMode("staff")}
              >
                <Users className="mr-1 inline h-3 w-3" /> Staff
              </button>
            </div>

            {/* Persona list */}
            <div className="mb-3 max-h-52 space-y-1 overflow-y-auto">
              {allPersonas.filter((p) => viewMode === "student" ? p.role === "student" : p.role === "staff" || p.role === "officer").map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPersona(p.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-muted",
                    currentPersona.id === p.id && "bg-primary/10 ring-1 ring-primary/30"
                  )}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {p.avatar}
                  </span>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{p.name}</div>
                    <div className="text-muted-foreground truncate">{p.title}</div>
                  </div>
                </button>
              ))}
            </div>

            <Button variant="outline" size="sm" className="w-full text-xs" onClick={resetData}>
              <RotateCcw className="mr-1 h-3 w-3" /> Reset Demo Data
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105"
      >
        <Settings2 className="h-4 w-4" />
        <span>{currentPersona.name}</span>
        <span className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[10px]">
          {currentPersona.role}
        </span>
      </button>
    </div>
  );
}
