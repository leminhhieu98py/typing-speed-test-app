import { EDuration, EMode, ETextCategory } from '@/types/common';
import { CLASSIC_COLLECTION, RHETORIC_COLLECTION, SCIENCE_COLLECTION } from '@/assets/collections';

export const COLLECTIONS_MAPPING: Record<
  ETextCategory,
  Record<EDuration, Record<EMode, string[]>>
> = {
  [ETextCategory.CLASSIC]: CLASSIC_COLLECTION,
  [ETextCategory.RHETORIC]: RHETORIC_COLLECTION,
  [ETextCategory.SCIENCE]: SCIENCE_COLLECTION,
};
