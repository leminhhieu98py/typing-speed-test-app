import { COLLECTIONS_MAPPING } from '@/constants';
import {
  EDuration,
  EDifficulty,
  ETextCategory,
  Emode,
  type TUserInfo,
  ERecoreType,
  type TResult,
} from '@/types/common';
import { getRandomText } from '@/utils/typingUtils';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCountdown, useLocalStorage } from 'usehooks-ts';

export const useActions = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState(Emode.TIME);
  const [duration, setDuration] = useState(EDuration['60_SECONDS']);
  const [textCategory, setTextCategory] = useState(ETextCategory.CLASSIC);
  const [difficulty, setDifficulty] = useState(EDifficulty.MEDIUM);
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: Number(duration),
    intervalMs: 1000,
  });
  const [typedChars, setTypedChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [userInfo, setUserInfo] = useLocalStorage<TUserInfo>('typing-speed-test-user-info', {});
  const navigate = useNavigate();

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

  const isTyping = isStarted && typedChars > 0;
  const isTimeup = isTyping && count <= 0;

  const startTyping = () => {
    setIsStarted(true);
    inputRef.current?.focus();
  };

  const handleEnd = useCallback(() => {
    // Prepare record info
    const isFirstRecord = !userInfo.bestInfo;
    const isNewBestRecord = !isFirstRecord && (userInfo.bestInfo?.[difficulty]?.wpm || 0) < wpm;
    const recordType = isFirstRecord
      ? ERecoreType.BASELINE
      : isNewBestRecord
        ? ERecoreType.BEST
        : ERecoreType.NORMAL;

    const saveNewRecord = () => {
      const result: TResult = {
        wpm,
        accuracy: Math.round(accuracy),
        duration,
        recordedTimestamp: Date.now(),
      };

      const bestRecord = isNewBestRecord ? { [difficulty]: result } : undefined;
      const bestInfo = isFirstRecord
        ? { [difficulty]: result }
        : { ...userInfo.bestInfo, ...bestRecord };

      setUserInfo({
        ...userInfo,
        ...result,
        difficulty,
        bestInfo,
      });
    };

    // Actions
    inputRef.current?.blur();
    saveNewRecord();
    navigate({
      to: '/result',
      search: {
        from: 'homepage',
        recordType,
      },
    });
  }, [inputRef, navigate, userInfo, setUserInfo, wpm, accuracy, duration, difficulty]);

  useEffect(() => {
    if (mode === Emode.TIME && isTyping && typedChars === 1) {
      startCountdown();
    }
  }, [mode, isTyping, typedChars, count, duration, startCountdown]);

  useEffect(() => {
    if (isTimeup) {
      handleEnd();
    }
  }, [isTimeup, handleEnd]);

  useEffect(() => {
    resetCountdown();
  }, [duration, resetCountdown]);

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
    inputRef,
    isStarted,
    handleEnd,
  };
};
