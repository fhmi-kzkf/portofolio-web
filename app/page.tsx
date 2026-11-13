import { PortfolioPage } from '@/components/portfolio-page';
import { getContent } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const content = await getContent();

  return <PortfolioPage content={content} />;
}
