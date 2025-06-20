'use client';

import { LanguageContext, useLanguageState } from '@/hooks/use-language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const languageState = useLanguageState();

  return (
    <LanguageContext.Provider value={languageState}>
      {children}
    </LanguageContext.Provider>
  );
}