import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { HeaderComponent } from '@/components/common';
import { Theme } from '@radix-ui/themes';
import { useState } from 'react';
import type { TRadixTheme } from '@typing/radix';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [theme, setTheme] = useState<TRadixTheme>('dark');
  return (
    <>
      <Theme appearance={theme}>
        <HeaderComponent
          theme={theme}
          setTheme={setTheme}
        />
        <Outlet />
      </Theme>
      <TanStackRouterDevtools position='bottom-right' />
    </>
  );
}
