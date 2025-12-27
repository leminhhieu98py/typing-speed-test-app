import type { TRadixTheme } from '@typing/radix';
import type { Dispatch, SetStateAction } from 'react';

type ActionsProps = {
  setTheme: Dispatch<SetStateAction<TRadixTheme>>;
};

export const useActions = ({ setTheme }: ActionsProps) => {
  const handleChangeTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'dark') return 'light';
      return 'dark';
    });
  };

  return { handleChangeTheme };
};
