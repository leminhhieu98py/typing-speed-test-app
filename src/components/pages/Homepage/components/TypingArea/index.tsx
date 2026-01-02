import { memo, type Dispatch, type RefObject, type SetStateAction } from 'react';
import CompletedPart from '../CompletedPart';
import CurrentPart from '../CurrentPart';
import RemainPart from '../RemainPart';
import { useActions } from './useActions';
import { Card, ScrollArea, Section, Text } from '@radix-ui/themes';
import styles from './styles.module.css';

type TTypingAreaProps = {
  text: string;
  setTypedChars: Dispatch<SetStateAction<number>>;
  setIncorrectChars: Dispatch<SetStateAction<number>>;
  startTyping: () => void;
  isTyping: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
};

const TypingArea = memo(
  ({
    text,
    setTypedChars,
    setIncorrectChars,
    startTyping,
    isTyping,
    inputRef,
  }: TTypingAreaProps) => {
    const {
      handleContainerClick,
      completedText,
      currentText,
      remainText,
      inputtedText,
      setCurrentWordIndex,
      setInputtedText,
      isLimited,
      scrollContainerRef,
    } = useActions({ text, inputRef, isTyping });

    return (
      <Section onClick={handleContainerClick}>
        <Card
          variant='ghost'
          style={{ boxShadow: 'var(--shadow-3)', margin: 0, padding: '1rem', textAlign: 'justify' }}
        >
          {!isTyping && (
            <div
              className={styles.focusOverlay}
              onClick={startTyping}
            >
              <Text color='gray'>Click to focus and start typing</Text>
            </div>
          )}
          <ScrollArea
            ref={scrollContainerRef}
            type='always'
            scrollbars='vertical'
            style={{ height: '26rem', padding: '1rem' }}
          >
            <CompletedPart
              originalText={completedText}
              inputtedText={inputtedText}
            />
            <CurrentPart
              inputRef={inputRef}
              scrollContainerRef={scrollContainerRef}
              setCurrentWordIndex={setCurrentWordIndex}
              setInputtedText={setInputtedText}
              originalText={currentText}
              isLimited={isLimited}
              setTypedChars={setTypedChars}
              setIncorrectChars={setIncorrectChars}
            />
            <RemainPart text={remainText} />
          </ScrollArea>
        </Card>
      </Section>
    );
  }
);

export default TypingArea;
