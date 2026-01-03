import type { TUserInfo } from '@/types/common';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const useActions = () => {
  const [, setValue] = useLocalStorage<TUserInfo>('typing-speed-test-user-info', {});
  const [tempUserInfo, setTempUserInfo] = useState<Pick<TUserInfo, 'name' | 'gender'>>({});
  const [isOpen, setIsOpen] = useState(true);

  const isSavable = tempUserInfo.name && tempUserInfo.gender;

  const handleChangeUserInfo = (name: 'name' | 'gender', value: string) => {
    setTempUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickSave = () => {
    setValue(tempUserInfo);
    setIsOpen(false);
  };

  return { handleChangeUserInfo, handleClickSave, isOpen, isSavable };
};
