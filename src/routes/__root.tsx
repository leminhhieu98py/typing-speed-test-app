import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { HeaderComponent } from '@/components/common';
import { Theme } from '@radix-ui/themes';
import { useState } from 'react';
import type { TRadixTheme } from '@typing/radix';
import UserInfoDialog from '@/components/UserInfoDialog';
import { useLocalStorage } from 'usehooks-ts';
import type { TUserInfo } from '@/types/common';
import { TypingContextProvider } from '@/context/TypingContext';
import ConfirmNavigateDialog from '@/components/ConfirmNavigateDialog';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [theme, setTheme] = useState<TRadixTheme>('light');
  const [userInfo] = useLocalStorage<TUserInfo>('typing-speed-test-user-info', {});
  const isValidLocalStorage = userInfo.name && userInfo.gender;

  return (
    <>
      <Theme
        appearance={theme}
        accentColor='grass'
        grayColor='slate'
        radius='large'
      >
        <TypingContextProvider>
          <HeaderComponent
            theme={theme}
            setTheme={setTheme}
          />
          {!isValidLocalStorage && <UserInfoDialog />}
          <ConfirmNavigateDialog />
          <Outlet />
        </TypingContextProvider>
      </Theme>
      <TanStackRouterDevtools position='bottom-right' />
    </>
  );
}
