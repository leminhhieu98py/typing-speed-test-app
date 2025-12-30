import { Container } from '@radix-ui/themes';
import SettingArea from './components/SettingArea';
import TypingArea from './components/TypingArea';
import { useActions } from './useActions';
import RealtimeResult from './components/RealtimeResult';

export const HomePage = () => {
  const { text, mode, setMode, setDuration, setTextCategory, setDifficulty, wpm, accuracy, count } =
    useActions();

  return (
    <Container px={{ sm: '3rem', md: '6rem', lg: '10rem' }}>
      <SettingArea
        mode={mode}
        setMode={setMode}
        setDuration={setDuration}
        setTextCategory={setTextCategory}
        setDifficulty={setDifficulty}
      />
      <RealtimeResult
        wpm={wpm}
        accuracy={accuracy}
        count={count}
      />
      <TypingArea text={text} />
    </Container>
  );
};
