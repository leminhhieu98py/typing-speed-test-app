import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/result')({
  component: ResultComponent,
});

function ResultComponent() {
  return (
    <div className='p-2'>
      <h3>Results</h3>
    </div>
  );
}
