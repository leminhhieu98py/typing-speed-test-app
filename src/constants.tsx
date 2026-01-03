import { EDuration, EDifficulty, ETextCategory } from '@/types/common';
import { CLASSIC_COLLECTION, RHETORIC_COLLECTION, SCIENCE_COLLECTION } from '@/assets/collections';
import { AvatarMale, AvatarFemale } from '@/assets/images';

export const COLLECTIONS_MAPPING: Record<
  ETextCategory,
  Record<EDuration, Record<EDifficulty, string[]>>
> = {
  [ETextCategory.CLASSIC]: CLASSIC_COLLECTION,
  [ETextCategory.RHETORIC]: RHETORIC_COLLECTION,
  [ETextCategory.SCIENCE]: SCIENCE_COLLECTION,
};

export const GENDER_IMAGE_SRC_MAP: Record<string, string> = {
  male: AvatarMale,
  female: AvatarFemale,
};
