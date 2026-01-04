import { fireFireworks } from '@/utils/confettiUtils';
import { useSearch } from '@tanstack/react-router';

import { useEffect } from 'react';

export const useActions = () => {
  const { from }: { from?: string } = useSearch({ from: '/result' });

  useEffect(() => {
    if (from === 'homepage') {
      fireFireworks();
    }
  }, [from]);

  return {};
};
