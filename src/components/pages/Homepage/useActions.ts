import { COLLECTIONS_MAPPING } from '@/constants';
import { EDuration, EDifficulty, ETextCategory, Emode } from '@/types/common';
import { getRandomText } from '@/utils/typingUtils';
import { useMemo, useRef, useState } from 'react';
import { useCountdown } from 'usehooks-ts';

export const useActions = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState(Emode.TIME);
  const [duration, setDuration] = useState(EDuration['60_SECONDS']);
  const [textCategory, setTextCategory] = useState(ETextCategory.CLASSIC);
  const [difficulty, setDifficulty] = useState(EDifficulty.MEDIUM);
  const [count, { startCountdown }] = useCountdown({
    countStart: Number(duration),
    intervalMs: 1000,
  });
  const [typedChars, setTypedChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const text = useMemo(() => {
    const texts = COLLECTIONS_MAPPING[textCategory][duration][difficulty];
    return getRandomText(texts);
  }, [duration, textCategory, difficulty]);

  const wpm = useMemo(() => {
    const timeElapsedInSeconds = Number(duration) - count;
    const timeElapsedInMinutes = timeElapsedInSeconds / 60 || 1;
    const netWPM = (typedChars - incorrectChars) / (5 * timeElapsedInMinutes);

    return Math.max(0, Math.round(netWPM));
  }, [count, duration, incorrectChars, typedChars]);

  const accuracy = useMemo(
    () => ((typedChars - incorrectChars) / (typedChars || 1)) * 100,
    [typedChars, incorrectChars]
  );

  const startTyping = () => {
    setIsTyping(true);
    startCountdown();
    inputRef.current?.focus();
  };

  return {
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
    isTyping,
    inputRef,
  };
};
