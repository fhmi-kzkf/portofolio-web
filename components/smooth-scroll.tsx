'use client';

import { usePathname } from 'next/navigation';
import { ReactLenis } from '@studio-freight/react-lenis';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
