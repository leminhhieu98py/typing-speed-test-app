import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';

type TActionsProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  setCurrentWordIndex: Dispatch<SetStateAction<number>>;
  setInputtedText: Dispatch<SetStateAction<string>>;
  originalText: string;
  isLimited: boolean;
};

export const useActions = ({
  inputRef,
  scrollContainerRef,
  setCurrentWordIndex,
  setInputtedText,
  originalText,
  isLimited,
}: TActionsProps) => {
  const [inputValue, setInputValue] = useState('');
  const spanRef = useRef<HTMLSpanElement>(null);

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

  useEffect(() => {
    const inputEl = inputRef.current;
    if (!inputEl) return;

    const handleInput = () => {
      setInputValue(inputEl.value.trim());
    };

    handleInput();
    inputEl.addEventListener('input', handleInput);

    return () => {
      inputEl.removeEventListener('input', handleInput);
    };
  }, [inputRef]);

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

  return { inputRef, inputValue, handleInputKeyUp, spanRef };
};
