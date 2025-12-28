import { Text } from '@radix-ui/themes';
import { useActions } from './useActions';
import type { Dispatch, SetStateAction } from 'react';

type TCurrentPartProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  setCurrentWordIndex: Dispatch<SetStateAction<number>>;
  setInputtedText: Dispatch<SetStateAction<string>>;
  originalText: string;
  isLimited: boolean;
};

const CurrentPart = ({
  inputRef,
  setCurrentWordIndex,
  setInputtedText,
  originalText,
  isLimited,
}: TCurrentPartProps) => {
  const { handleInputKeyUp, inputValue } = useActions({
    inputRef,
    setCurrentWordIndex,
    setInputtedText,
    originalText,
    isLimited,
  });

  return (
    <>
      <input
        ref={inputRef}
        onKeyUp={handleInputKeyUp}
        style={{ position: 'absolute', opacity: 0, height: 0, width: 0, cursor: 'none' }}
        maxLength={originalText.length}
      />
      <Text
        as='span'
        color='ruby'
        style={{ marginRight: 8 }}
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
              {...(index === inputValue.length && { style: { textDecoration: 'underline' } })}
            >
              {char}
            </Text>
          );
        })}
      </Text>
    </>
  );
};

export default CurrentPart;
