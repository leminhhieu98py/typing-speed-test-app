import { Flex } from '@radix-ui/themes';
import SettingArea from '../SettingArea';
import RealtimeResult from '../RealtimeResult';
import TypingArea from '../TypingArea';
import { useActions } from './useActions';

type THomeContentProps = { handleRestart: () => void };

const HomeContent = ({ handleRestart }: THomeContentProps) => {
  const {
    text,
    isTimeMode,
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
    setIsEndOfParagraph,
  } = useActions();

  return (
    <>
      <Flex
        gap={{ sm: '1rem', md: '2rem', lg: '3rem' }}
        justify='between'
      >
        <SettingArea
          isTimeMode={isTimeMode}
          setMode={setMode}
          setDuration={setDuration}
          setTextCategory={setTextCategory}
          setDifficulty={setDifficulty}
          isStarted={isStarted}
          handleRestart={handleRestart}
        />
        <RealtimeResult
          isTimeMode={isTimeMode}
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
        setIsEndOfParagraph={setIsEndOfParagraph}
      />
    </>
  );
};

export default HomeContent;
