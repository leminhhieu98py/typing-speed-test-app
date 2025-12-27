import { Link } from '@tanstack/react-router';
import type { TRadixTheme } from '../../../types/radix.type';
import { useActions } from './useActions';
import type { Dispatch, SetStateAction } from 'react';

type THeaderComponentProps = {
  theme: TRadixTheme;
  setTheme: Dispatch<SetStateAction<TRadixTheme>>;
};

export const HeaderComponent = ({ theme, setTheme }: THeaderComponentProps) => {
  const { handleChangeTheme } = useActions({ setTheme });

  return (
    <header>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/result'>Results</Link>
        </li>
      </ul>
      <button onClick={handleChangeTheme}>Current theme: {theme}</button>
    </header>
  );
};
