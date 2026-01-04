import { GENDER_IMAGE_SRC_MAP } from '@/constants';
import type { TUserInfo } from '@/types/common';
import type { TRadixTheme } from '@typing/radix';
import type { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type ActionsProps = {
  setTheme: Dispatch<SetStateAction<TRadixTheme>>;
};

export const useActions = ({ setTheme }: ActionsProps) => {
  const [userInfo] = useLocalStorage<TUserInfo>('typing-speed-test-user-info', {});
  const name = userInfo.name;
  const gender = userInfo.gender || 'other';
  const imageSrc = GENDER_IMAGE_SRC_MAP[gender];

  const handleChangeTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'dark') return 'light';
      return 'dark';
    });
  };

  return { handleChangeTheme, name, imageSrc };
};
