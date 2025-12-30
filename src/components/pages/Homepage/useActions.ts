import { COLLECTIONS_MAPPING } from '@/constants';
import { EDuration, EDifficulty, ETextCategory, Emode } from '@/types/common';
import { getRandomText } from '@/utils/typingUtils';
import { useMemo, useState } from 'react';

export const useActions = () => {
  const [mode, setMode] = useState(Emode.TIME);
  const [duration, setDuration] = useState(EDuration['60_SECONDS']);
  const [textCategory, setTextCategory] = useState(ETextCategory.CLASSIC);
  const [difficulty, setDifficulty] = useState(EDifficulty.MEDIUM);

  const text = useMemo(() => {
    const texts = COLLECTIONS_MAPPING[textCategory][duration][difficulty];
    return getRandomText(texts);
  }, [duration, textCategory, difficulty]);

  return { text, mode, setMode, setDuration, setTextCategory, setDifficulty };
};
