import { COLLECTIONS_MAPPING } from '@/constants';
import { EDuration, ETextCategory } from '@/types/common';
import { getRandomText } from '@/utils/typingUtils';
import { useMemo, useState } from 'react';

export const useActions = () => {
  const [duration] = useState(EDuration['15_SECONDS']);
  const [textCategory] = useState(ETextCategory.QUOTES);

  const text = useMemo(() => {
    const texts = COLLECTIONS_MAPPING[textCategory][duration];
    return getRandomText(texts);
  }, [duration, textCategory]);

  return { text };
};
