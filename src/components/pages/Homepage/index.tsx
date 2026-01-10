import { Section } from '@radix-ui/themes';
import { useActions } from './useActions';
import { HomeContent } from './components';

export const HomePage = () => {
  const { key, handleRestart } = useActions();

  return (
    <Section
      px={{ sm: '3rem', md: '6rem', lg: '10rem' }}
      py={{ sm: '1rem', md: '1rem', lg: '2rem' }}
    >
      <HomeContent
        key={key}
        handleRestart={handleRestart}
      />
    </Section>
  );
};
