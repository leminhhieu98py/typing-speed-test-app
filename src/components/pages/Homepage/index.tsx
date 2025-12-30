import { Container } from '@radix-ui/themes';
import SettingArea from './components/SettingArea';
import TypingArea from './components/TypingArea';
import { useActions } from './useActions';

export const HomePage = () => {
  const { text, mode, setMode, setDuration, setTextCategory, setDifficulty } = useActions();

  return (
    <Container px={{ sm: '3rem', md: '6rem', lg: '10rem' }}>
      <SettingArea
        mode={mode}
        setMode={setMode}
        setDuration={setDuration}
        setTextCategory={setTextCategory}
        setDifficulty={setDifficulty}
      />
      <TypingArea text={text} />
    </Container>
  );
};
