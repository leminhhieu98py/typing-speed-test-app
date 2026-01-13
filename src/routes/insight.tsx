import { InsightPage } from '@/components/pages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/insight')({
  component: InsightPage,
});
