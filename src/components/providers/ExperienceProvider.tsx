"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type SpherePhase =
  | "intro"
  | "hero"
  | "side"
  | "fullscreen"
  | "hidden";

type SphereContextValue = {
  phase: SpherePhase;
  setPhase: (phase: SpherePhase) => void;
  mouse: { x: number; y: number };
  setMouse: (x: number, y: number) => void;
  introComplete: boolean;
  setIntroComplete: (v: boolean) => void;
  showNav: boolean;
  setShowNav: (v: boolean) => void;
};

const SphereContext = createContext<SphereContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<SpherePhase>("intro");
  const [mouse, setMouseState] = useState({ x: 0, y: 0 });
  const [introComplete, setIntroComplete] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const setMouse = useCallback((x: number, y: number) => {
    setMouseState({ x, y });
  }, []);

  const value = useMemo(
    () => ({
      phase,
      setPhase,
      mouse,
      setMouse,
      introComplete,
      setIntroComplete,
      showNav,
      setShowNav,
    }),
    [
      phase,
      mouse,
      setMouse,
      introComplete,
      showNav,
    ],
  );

  return (
    <SphereContext.Provider value={value}>{children}</SphereContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(SphereContext);
  if (!ctx) {
    throw new Error("useExperience must be used within ExperienceProvider");
  }
  return ctx;
}
