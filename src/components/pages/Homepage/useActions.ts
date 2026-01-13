import { TypingDispatchContext } from '@/context/TypingContext';
import { useCallback, useContext, useState } from 'react';

export const useActions = () => {
  const [key, setKey] = useState(0);
  const dispatch = useContext(TypingDispatchContext);

  const handleRestart = useCallback(() => {
    setKey((prev) => prev + 1);
    dispatch?.({ type: 'stopTyping' });
  }, [dispatch]);

  return {
    key,
    handleRestart,
  };
};
