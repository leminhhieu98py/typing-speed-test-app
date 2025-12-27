import { createFileRoute } from '@tanstack/react-router';
import { ResultPage } from '../components/pages';

export const Route = createFileRoute('/result')({
  component: ResultPage,
});
