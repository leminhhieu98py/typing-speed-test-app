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

export type TResult = {
  wpm?: number;
  accuracy?: number;
  duration?: EDuration;
  recordedTimestamp?: number;
  correctChars?: number;
  incorrectChars?: number;
  signature?: string;
};

export type TUserInfo = {
  name?: string;
  gender?: 'male' | 'female' | 'other';
  difficulty?: EDifficulty;
  bestInfo?: Partial<Record<EDifficulty, TResult>>;
} & TResult;

export enum ERecoreType {
  'BASELINE' = 'BASELINE',
  'BEST' = 'BEST',
  'NORMAL' = 'NORMAL',
  'LAST_RESULT' = 'LAST_RESULT',
}
