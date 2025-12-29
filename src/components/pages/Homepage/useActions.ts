import { COLLECTIONS_MAPPING } from '@/constants';
import { EDuration, EMode, ETextCategory } from '@/types/common';
import { getRandomText } from '@/utils/typingUtils';
import { useMemo, useState } from 'react';

export const useActions = () => {
  const [duration] = useState(EDuration['15_SECONDS']);
  const [textCategory] = useState(ETextCategory.CLASSIC);
  const [mode] = useState(EMode.EASY);

  const text = useMemo(() => {
    const texts = COLLECTIONS_MAPPING[textCategory][duration][mode];
    return getRandomText(texts);
  }, [duration, textCategory, mode]);

  return { text };
};
