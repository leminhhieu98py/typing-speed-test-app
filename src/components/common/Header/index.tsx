import type { TRadixTheme } from '@typing/radix';
import { useActions } from './useActions';
import { useContext, type MouseEvent } from 'react';
import { Avatar, Card, Flex, IconButton, Strong, TabNav, Text, Tooltip } from '@radix-ui/themes';
import { Logo } from '@/assets/images';
import { Link, useLocation } from '@tanstack/react-router';
import styles from './styles.module.css';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { TypingContext, TypingDispatchContext } from '@/context/TypingContext';

type THeaderComponentProps = {
  theme: TRadixTheme;
};

type TRoute = { to: '/' | '/result' | '/insight'; label: string };

const HOME_ROUTES: TRoute[] = [
  { to: '/', label: 'Home' },
  { to: '/result', label: 'Result' },
  { to: '/insight', label: 'Insight' },
];

const TabNavLink = () => {
  const location = useLocation();
  const typingState = useContext(TypingContext);
  const dispatch = useContext(TypingDispatchContext);
  const handleClickLink = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    route: TRoute
  ) => {
    if (typingState?.isTyping && route.to !== '/') {
      e.preventDefault();
      dispatch?.({ type: 'showConfirmNavigate', to: route.to });
    }
  };

  return HOME_ROUTES.map((route) => (
    <TabNav.Link
      key={route.to}
      active={location.pathname === route.to}
      asChild
    >
      <Link
        onClick={(e) => handleClickLink(e, route)}
        key={route.to}
        to={route.to}
      >
        {route.label}
      </Link>
    </TabNav.Link>
  ));
};

export const HeaderComponent = ({ theme }: THeaderComponentProps) => {
  const { handleChangeTheme, name, imageSrc } = useActions();
  const isDark = theme === 'dark';

  return (
    <header className={styles.header}>
      <Flex justify='between'>
        <Flex
          gap={{ initial: '1', md: '2' }}
          align='center'
        >
          <img
            src={Logo}
            alt='A logo with "T" text and green background color'
            className={styles.headerLogo}
          />
          <Text size={{ initial: '1', md: '5' }}>
            <Strong>Just type</Strong>
          </Text>
        </Flex>
        <TabNav.Root size={{ initial: '1', md: '2' }}>
          <TabNavLink />
        </TabNav.Root>
        <Flex
          gap={{ initial: '1', md: '3' }}
          align='center'
          justify='center'
        >
          {name && (
            <Card variant='ghost'>
              <Flex
                gap={{ initial: '1', md: '3' }}
                align='center'
              >
                <Avatar
                  size='1'
                  {...(imageSrc && { src: imageSrc })}
                  radius='full'
                  fallback={'O'}
                />
                <Text
                  as='div'
                  size={{ initial: '1', md: '2' }}
                  weight='bold'
                  color='green'
                >
                  {name}
                </Text>
              </Flex>
            </Card>
          )}
          <Tooltip content='Toggle theme'>
            <IconButton
              onClick={handleChangeTheme}
              variant='soft'
              size={{ initial: '1', md: '2' }}
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
        </Flex>
      </Flex>
    </header>
  );
};
