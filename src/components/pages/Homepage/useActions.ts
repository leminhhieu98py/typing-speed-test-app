import { COLLECTIONS_MAPPING } from '@/constants';
import { EDuration, EDifficulty, ETextCategory, Emode } from '@/types/common';
import { getRandomText } from '@/utils/typingUtils';
import { useMemo, useState } from 'react';
import { useCountdown } from 'usehooks-ts';

export const useActions = () => {
  const [mode, setMode] = useState(Emode.TIME);
  const [duration, setDuration] = useState(EDuration['60_SECONDS']);
  const [textCategory, setTextCategory] = useState(ETextCategory.CLASSIC);
  const [difficulty, setDifficulty] = useState(EDifficulty.MEDIUM);
  const [count] = useCountdown({
    countStart: Number(duration),
    intervalMs: 1000,
  });

  const text = useMemo(() => {
    const texts = COLLECTIONS_MAPPING[textCategory][duration][difficulty];
    return getRandomText(texts);
  }, [duration, textCategory, difficulty]);

  const wpm = useMemo(() => 0, []);
  const accuracy = useMemo(() => 100, []);

  return { text, mode, setMode, setDuration, setTextCategory, setDifficulty, wpm, accuracy, count };
};
