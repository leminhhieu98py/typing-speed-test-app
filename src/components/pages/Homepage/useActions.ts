import { useCallback, useState } from 'react';

export const useActions = () => {
  const [key, setKey] = useState(0);

  const handleRestart = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  return {
    key,
    handleRestart,
  };
};
