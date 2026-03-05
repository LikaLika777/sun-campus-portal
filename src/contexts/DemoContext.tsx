import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { personas, type Persona, type PersonaRole } from "@/mocks/personas";
import { enquiries as initialEnquiries, cases as initialCases, anonymousReports as initialAnonymousReports, type Enquiry, type Case, type AnonymousReport } from "@/mocks/demo-stories";

interface DemoState {
  isActive: boolean;
  currentPersona: Persona;
  viewMode: "student" | "staff";
  enquiries: Enquiry[];
  cases: Case[];
  anonymousReports: AnonymousReport[];
}

interface DemoContextValue extends DemoState {
  toggleDemo: () => void;
  setPersona: (id: string) => void;
  setViewMode: (mode: "student" | "staff") => void;
  resetData: () => void;
  addEnquiry: (enquiry: Enquiry) => void;
  addCase: (c: Case) => void;
  addAnonymousReport: (r: AnonymousReport) => void;
  allPersonas: Persona[];
  isLoggedIn: boolean;
}

const DemoContext = createContext<DemoContextValue | null>(null);

function getInitialState(): DemoState {
  return {
    isActive: true,
    currentPersona: personas[0],
    viewMode: "student",
    enquiries: [...initialEnquiries],
    cases: [...initialCases],
    anonymousReports: [...initialAnonymousReports],
  };
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(getInitialState);

  const toggleDemo = useCallback(() => setState((s) => ({ ...s, isActive: !s.isActive })), []);

  const setPersona = useCallback((id: string) => {
    const persona = personas.find((p) => p.id === id) ?? personas[0];
    const viewMode: "student" | "staff" = persona.role === "student" ? "student" : "staff";
    setState((s) => ({ ...s, currentPersona: persona, viewMode }));
  }, []);

  const setViewMode = useCallback((mode: "student" | "staff") => setState((s) => ({ ...s, viewMode: mode })), []);

  const resetData = useCallback(() => setState(getInitialState), []);

  const addEnquiry = useCallback((enquiry: Enquiry) => setState((s) => ({ ...s, enquiries: [...s.enquiries, enquiry] })), []);
  const addCase = useCallback((c: Case) => setState((s) => ({ ...s, cases: [...s.cases, c] })), []);
  const addAnonymousReport = useCallback((r: AnonymousReport) => setState((s) => ({ ...s, anonymousReports: [...s.anonymousReports, r] })), []);

  const isLoggedIn = state.currentPersona.id !== "anonymous";

  return (
    <DemoContext.Provider value={{ ...state, toggleDemo, setPersona, setViewMode, resetData, addEnquiry, addCase, addAnonymousReport, allPersonas: personas, isLoggedIn }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
