import type { TUserInfo } from '@/types/common';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const useActions = () => {
  const [, setUserInfo] = useLocalStorage<TUserInfo>('typing-speed-test-user-info', {});
  const [newUserInfo, setNewUserInfo] = useState<Pick<TUserInfo, 'name' | 'gender'>>({});
  const [isOpen, setIsOpen] = useState(true);

  const isSavable = newUserInfo.name && newUserInfo.gender;

  const handleChangeUserInfo = (name: 'name' | 'gender', value: string) => {
    setNewUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickSave = () => {
    setUserInfo(newUserInfo);
    setIsOpen(false);
  };

  return { handleChangeUserInfo, handleClickSave, isOpen, isSavable };
};
