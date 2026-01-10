import { EDuration, EDifficulty, ETextCategory } from '@/types/common';
import { CLASSIC_COLLECTION, RHETORIC_COLLECTION, SCIENCE_COLLECTION } from '@/assets/collections';
import { AvatarMale, AvatarFemale } from '@/assets/images';

const COLLECTIONS_MAPPING: Record<
  ETextCategory,
  Record<EDuration, Record<EDifficulty, string[]>>
> = {
  [ETextCategory.CLASSIC]: CLASSIC_COLLECTION,
  [ETextCategory.RHETORIC]: RHETORIC_COLLECTION,
  [ETextCategory.SCIENCE]: SCIENCE_COLLECTION,
};

const GENDER_IMAGE_SRC_MAP: Record<string, string> = {
  male: AvatarMale,
  female: AvatarFemale,
};

const RESULT_PAGE_KEY = import.meta.env.RESULT_PAGE_KEY;

export { COLLECTIONS_MAPPING, GENDER_IMAGE_SRC_MAP, RESULT_PAGE_KEY };
