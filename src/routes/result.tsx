import { createFileRoute } from '@tanstack/react-router';
import { ResultPage } from '@pages';

export const Route = createFileRoute('/result')({
  component: ResultPage,
});
