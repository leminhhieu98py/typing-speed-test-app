import type { TRadixTheme } from '@typing/radix';
import { useActions } from './useActions';
import type { Dispatch, SetStateAction } from 'react';
import { Box, Flex, IconButton, Strong, TabNav, Text, Tooltip } from '@radix-ui/themes';
import { Logo } from '@/assets/images';
import { Link } from '@tanstack/react-router';
import styles from './styles.module.css';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

type THeaderComponentProps = {
  theme: TRadixTheme;
  setTheme: Dispatch<SetStateAction<TRadixTheme>>;
};

const HOME_ROUTES: Record<'to' | 'label', string>[] = [
  { to: '/', label: 'Home' },
  { to: '/result', label: 'Results' },
];

const TabNavLink = () =>
  HOME_ROUTES.map((route) => (
    <Link
      key={route.to}
      to={route.to}
    >
      {({ isActive }) => {
        return (
          <TabNav.Link
            href='#'
            active={isActive}
          >
            {route.label}
          </TabNav.Link>
        );
      }}
    </Link>
  ));

export const HeaderComponent = ({ theme, setTheme }: THeaderComponentProps) => {
  const { handleChangeTheme } = useActions({ setTheme });
  const isDark = theme === 'dark';

  return (
    <header className={styles.header}>
      <Flex justify='between'>
        <Flex
          gap='2'
          align='center'
        >
          <img
            src={Logo}
            alt='A logo with "T" text and green background color'
            className={styles.headerLogo}
          />
          <Text size='5'>
            <Strong>Just type</Strong>
          </Text>
        </Flex>
        <TabNav.Root>
          <TabNavLink />
        </TabNav.Root>
        <Box>
          <Tooltip content='Toggle theme'>
            <IconButton
              onClick={handleChangeTheme}
              variant='soft'
            >
              {isDark ? (
                <MoonIcon
                  width={18}
                  height={18}
                />
              ) : (
                <SunIcon
                  width={18}
                  height={18}
                />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Flex>
    </header>
  );
};
