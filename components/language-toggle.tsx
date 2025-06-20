'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'id' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{locale === 'en' ? 'ID' : 'EN'}</span>
    </Button>
  );
}