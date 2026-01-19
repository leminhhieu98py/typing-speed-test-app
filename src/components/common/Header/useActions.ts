import { GENDER_IMAGE_SRC_MAP } from '@/constants';
import type { TUserInfo } from '@/types/common';
import type { TRadixTheme } from '@typing/radix';
import { useLocalStorage } from 'usehooks-ts';

export const useActions = () => {
  const [userInfo, setUserInfo] = useLocalStorage<TUserInfo>('user-info', {});
  const name = userInfo.name;
  const gender = userInfo.gender || 'other';
  const imageSrc = GENDER_IMAGE_SRC_MAP[gender];

  const handleChangeTheme = () => {
    const theme: TRadixTheme = userInfo.theme === 'dark' ? 'light' : 'dark';
    setUserInfo({
      ...userInfo,
      theme,
    });
  };

  return { handleChangeTheme, name, imageSrc };
};
