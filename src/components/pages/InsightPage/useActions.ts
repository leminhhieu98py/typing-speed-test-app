import { EDifficulty, type TResult, type TuserHistory } from '@/types/common';
import { useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const useActions = () => {
  const [difficulty, setDifficulty] = useState(EDifficulty.MEDIUM);
  const [userHistory] = useLocalStorage<TuserHistory>('user-history', {});

  const historyByDifficulty: TResult[] = useMemo(() => {
    const history: TResult[] = [];

    for (const date in userHistory) {
      if (userHistory[date][difficulty]) {
        history.push(...userHistory[date][difficulty]);
      }
    }

    return history;
  }, [difficulty, userHistory]);

  return { data: historyByDifficulty, setDifficulty };
};
