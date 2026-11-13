import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CMS | Fahmi Raditya',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
