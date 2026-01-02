import { Flex, Section } from '@radix-ui/themes';
import SettingArea from './components/SettingArea';
import TypingArea from './components/TypingArea';
import { useActions } from './useActions';
import RealtimeResult from './components/RealtimeResult';

export const HomePage = () => {
  const {
    text,
    mode,
    setMode,
    setDuration,
    setTextCategory,
    setDifficulty,
    wpm,
    accuracy,
    count,
    setTypedChars,
    setIncorrectChars,
    startTyping,
    inputRef,
    isStarted,
  } = useActions();

  return (
    <Section
      px={{ sm: '3rem', md: '6rem', lg: '10rem' }}
      py={{ sm: '1rem', md: '1rem', lg: '2rem' }}
    >
      <Flex
        gap={{ sm: '1rem', md: '2rem', lg: '3rem' }}
        justify='between'
      >
        <SettingArea
          mode={mode}
          setMode={setMode}
          setDuration={setDuration}
          setTextCategory={setTextCategory}
          setDifficulty={setDifficulty}
          isStarted={isStarted}
        />
        <RealtimeResult
          wpm={wpm}
          accuracy={accuracy}
          count={count}
        />
      </Flex>
      <TypingArea
        inputRef={inputRef}
        text={text}
        key={text}
        setTypedChars={setTypedChars}
        setIncorrectChars={setIncorrectChars}
        startTyping={startTyping}
        isStarted={isStarted}
      />
    </Section>
  );
};
