import TypingArea from './components/TypingArea';
import { useActions } from './useActions';

export const HomePage = () => {
  const { text } = useActions();

  return (
    <div className='p-2'>
      <TypingArea text={text} />
    </div>
  );
};
