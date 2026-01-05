import { useActions } from './useActions';

export const ResultPage = () => {
  const { title, description } = useActions();

  return (
    <div className='p-2'>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
