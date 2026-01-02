import { Text } from '@radix-ui/themes';
import { useActions } from './useActions';
import { type Dispatch, type SetStateAction } from 'react';
import styles from './styles.module.css';

type TCurrentPartProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  setCurrentWordIndex: Dispatch<SetStateAction<number>>;
  setInputtedText: Dispatch<SetStateAction<string>>;
  originalText: string;
  isLimited: boolean;
  setTypedChars: Dispatch<SetStateAction<number>>;
  setIncorrectChars: Dispatch<SetStateAction<number>>;
};

const CurrentPart = ({
  inputRef,
  scrollContainerRef,
  setCurrentWordIndex,
  setInputtedText,
  originalText,
  isLimited,
  setTypedChars,
  setIncorrectChars,
}: TCurrentPartProps) => {
  const { inputValue, spanRef, handleInputKeyUp, handleBeforeInput, handleInput } = useActions({
    inputRef,
    setCurrentWordIndex,
    setInputtedText,
    originalText,
    isLimited,
    scrollContainerRef,
    setTypedChars,
    setIncorrectChars,
  });

  return (
    <>
      <input
        ref={inputRef}
        onBeforeInput={handleBeforeInput}
        onKeyUp={handleInputKeyUp}
        onInput={handleInput}
        style={{ position: 'absolute', opacity: 0, height: 0, width: 0, cursor: 'none' }}
        maxLength={originalText.length}
        onPaste={(e) => e.preventDefault()}
      />
      <Text
        size='8'
        color='ruby'
        ref={spanRef}
        className={styles.currentWord}
      >
        {originalText.split('').map((char, index) => {
          let color: 'green' | 'red' | 'gray' = 'green';

          if (!inputValue[index]) color = 'gray';
          else if (inputValue[index] !== char) color = 'red';

          return (
            <Text
              key={index}
              as='span'
              color={color}
              {...(index === inputValue.length && { className: styles.cursor })}
            >
              {char}
            </Text>
          );
        })}
      </Text>
      <Text size='8'>&nbsp;</Text>
    </>
  );
};

export default CurrentPart;
