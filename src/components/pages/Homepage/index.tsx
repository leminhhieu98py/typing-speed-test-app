import { Section } from '@radix-ui/themes';
import { useActions } from './useActions';
import { HomeContent } from './components';

export const HomePage = () => {
  const { key, handleRestart } = useActions();

  return (
    <Section
      px={{ initial: '2', sm: '4', md: '6', lg: '9' }}
      py={{ initial: '2', sm: '4', md: '6' }}
    >
      <HomeContent
        key={key}
        handleRestart={handleRestart}
      />
    </Section>
  );
};
