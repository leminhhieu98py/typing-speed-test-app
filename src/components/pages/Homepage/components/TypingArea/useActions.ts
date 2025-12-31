import { useEffect, useRef, useState } from 'react';

type TActionsProps = {
  text: string;
};

const getTextForEachPart = (
  text: string,
  index: number
): { completedText: string; currentText: string; remainText: string } => {
  const textInArray = text.split(' ');

  if (index < 0 || index >= textInArray.length) {
    console.warn('Index out of bounds');
    return {
      completedText: text,
      currentText: '',
      remainText: '',
    };
  }

  const completedText = textInArray.slice(0, index).join(' ');
  const currentText = textInArray[index];
  const remainText = textInArray.slice(index + 1).join(' ');

  return {
    completedText,
    currentText,
    remainText,
  };
};

export const useActions = ({ text }: TActionsProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputtedText, setInputtedText] = useState('');
  const { completedText, currentText, remainText } = getTextForEachPart(text, currentWordIndex);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const isLimited = currentWordIndex > text.split(' ').length - 1;

  useEffect(() => {
    if (isLimited) {
      console.log('go to the result');
    }
  }, [isLimited]);

  return {
    inputRef,
    handleContainerClick,
    completedText,
    currentText,
    remainText,
    inputtedText,
    setCurrentWordIndex,
    setInputtedText,
    isLimited,
    scrollContainerRef,
  };
};
