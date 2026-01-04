import { fireFireworks } from '@/utils/confettiUtils';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { useEffect } from 'react';

export const useActions = () => {
  const { from }: { from?: string } = useSearch({ from: '/result' });
  const navigate = useNavigate();

  useEffect(() => {
    if (from === 'homepage') {
      fireFireworks();
      navigate({
        to: '/result',
        replace: true,
      });
    }
  }, [from, navigate]);

  return {};
};
