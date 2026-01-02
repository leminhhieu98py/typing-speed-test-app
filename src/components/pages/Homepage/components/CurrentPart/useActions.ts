import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';

type TActionsProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  setCurrentWordIndex: Dispatch<SetStateAction<number>>;
  setInputtedText: Dispatch<SetStateAction<string>>;
  originalText: string;
  isLimited: boolean;
  setTypedChars: Dispatch<SetStateAction<number>>;
  setIncorrectChars: Dispatch<SetStateAction<number>>;
};

const countRegex = /^[a-zA-Z\s\-,.']+$/;

export const useActions = ({
  inputRef,
  scrollContainerRef,
  setCurrentWordIndex,
  setInputtedText,
  originalText,
  isLimited,
  setTypedChars,
  setIncorrectChars,
}: TActionsProps) => {
  const [inputValue, setInputValue] = useState('');
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleBeforeInput = (event: React.FormEvent<HTMLInputElement>) => {
    const inputEvent = event.nativeEvent as InputEvent & { code: string };
    const character = inputEvent.code === 'Space' ? ' ' : inputEvent.data;

    if (!character?.length) return;

    if (countRegex.test(character)) {
      setTypedChars((prev) => prev + 1);

      if (character !== originalText[inputValue.length] && character !== ' ') {
        setIncorrectChars((prev) => prev + 1);
      }
    }
  };

  const handleInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const character = event.key;

    if (inputValue.length > originalText.length) return;

    if (character === ' ') {
      if (!isLimited) {
        setCurrentWordIndex((prev) => prev + 1);
      }

      setInputtedText((prev) => (inputValue ? `${prev} ${inputValue}` : prev));
      inputRef.current!.value = '';
      setInputValue('');
    }
  };

  const handleInput = () => {
    const inputEl = inputRef.current;
    if (!inputEl) return;
    setInputValue(inputEl.value.trim());
  };

  useEffect(() => {
    if (spanRef.current && scrollContainerRef.current) {
      const spanTop = spanRef.current.offsetTop - scrollContainerRef.current.offsetTop;
      const offsetTop = 40;

      scrollContainerRef.current.scrollTo({
        top: spanTop - offsetTop,
        behavior: 'instant',
      });
    }
  }, [spanRef, scrollContainerRef, originalText]);

  return { inputRef, inputValue, handleInputKeyUp, spanRef, handleBeforeInput, handleInput };
};
