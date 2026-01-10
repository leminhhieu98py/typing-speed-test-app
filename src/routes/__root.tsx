import { Outlet, createRootRoute, useSearch } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { HeaderComponent } from '@/components/common';
import { Theme } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import type { TRadixTheme } from '@typing/radix';
import UserInfoDialog from '@/components/UserInfoDialog';
import { useLocalStorage } from 'usehooks-ts';
import type { TUserInfo } from '@/types/common';
import { TypingContextProvider } from '@/context/TypingContext';
import ConfirmNavigateDialog from '@/components/ConfirmNavigateDialog';
import { RESULT_PAGE_KEY } from '@/constants';
import CryptoJS from 'crypto-js';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [theme, setTheme] = useState<TRadixTheme>('light');
  const [userInfo, , removeUserInfo] = useLocalStorage<TUserInfo>(
    'typing-speed-test-user-info',
    {}
  );
  const isValidLocalStorage = userInfo.name && userInfo.gender;
  const { p }: { p?: string } = useSearch({ strict: false });
  const [sharePayload] = useState(p);

  useEffect(() => {
    if (userInfo.wpm) {
      const { wpm, accuracy, duration, recordedTimestamp } = userInfo;
      const expectedSignature = CryptoJS.HmacSHA256(
        `${wpm}_${accuracy}_${duration}_${recordedTimestamp}`,
        RESULT_PAGE_KEY
      ).toString();

      if (expectedSignature !== userInfo.signature) {
        alert("You're cheating so we remove all of your results");
        removeUserInfo();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.wpm, userInfo.accuracy, userInfo.duration, userInfo.recordedTimestamp]);

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
          {!isValidLocalStorage && !sharePayload && <UserInfoDialog />}
          <ConfirmNavigateDialog />
          <Outlet />
        </TypingContextProvider>
      </Theme>
      <TanStackRouterDevtools position='bottom-right' />
    </>
  );
}
