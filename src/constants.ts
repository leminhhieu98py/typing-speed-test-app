import { QUOTES } from '@/assets/collections/quotes';
import { EDuration, ETextCategory } from '@/types/common';

export const COLLECTIONS_MAPPING: Record<ETextCategory, Record<EDuration, string[]>> = {
  [ETextCategory.QUOTES]: QUOTES,
};
