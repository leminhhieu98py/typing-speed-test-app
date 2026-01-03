export enum EDuration {
  '15_SECONDS' = '15',
  '30_SECONDS' = '30',
  '60_SECONDS' = '60',
  '120_SECONDS' = '120',
}

export enum EDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export enum ETextCategory {
  CLASSIC = 'CLASSIC',
  RHETORIC = 'RHETORIC',
  SCIENCE = 'SCIENCE',
}

export enum Emode {
  TIME = 'TIME',
  PASSAGE = 'PASSAGE',
}

export type TUserInfo = {
  name?: string;
  gender?: 'male' | 'female' | 'other';
  bestWPM?: number | string;
  accuracy?: number | string;
  recordedTimestamp?: number;
  difificulty?: EDifficulty;
};
