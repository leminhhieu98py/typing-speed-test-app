import { COLLECTIONS_MAPPING, RESULT_PAGE_KEY } from '@/constants';
import { TypingDispatchContext } from '@/context/TypingContext';
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
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useCountdown, useLocalStorage } from 'usehooks-ts';
import CryptoJS from 'crypto-js';

const DEFAULT_SETTING = {
  duration: EDuration['30_SECONDS'],
  textCategory: ETextCategory.CLASSIC,
  difficulty: EDifficulty.MEDIUM,
};

export const useActions = () => {
  const dispatch = useContext(TypingDispatchContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState(Emode.TIME);
  const [duration, setDuration] = useState(DEFAULT_SETTING.duration);
  const [textCategory, setTextCategory] = useState(DEFAULT_SETTING.textCategory);
  const [difficulty, setDifficulty] = useState(DEFAULT_SETTING.difficulty);
  const [isEndOfParagraph, setIsEndOfParagraph] = useState(false);
  const isTimeMode = mode === Emode.TIME;
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: isTimeMode ? Number(duration) : 0,
    isIncrement: !isTimeMode,
    countStop: isTimeMode ? 0 : Infinity,
  });

  const [typedChars, setTypedChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [userInfo, setUserInfo] = useLocalStorage<TUserInfo>('typing-speed-test-user-info', {});
  const navigate = useNavigate();

  const text = useMemo(() => {
    const texts =
      COLLECTIONS_MAPPING[textCategory][isTimeMode ? duration : DEFAULT_SETTING.duration][
        difficulty
      ];
    return getRandomText(texts);
  }, [duration, textCategory, difficulty, isTimeMode]);

  const wpm = useMemo(() => {
    const timeElapsedInSeconds = isTimeMode ? Number(duration) - count : count;
    const timeElapsedInMinutes = timeElapsedInSeconds / 60 || 1;
    const netWPM = (typedChars - incorrectChars) / (5 * timeElapsedInMinutes);

    return Math.max(0, Math.round(netWPM));
  }, [count, duration, incorrectChars, typedChars, isTimeMode]);

  const accuracy = useMemo(
    () => ((typedChars - incorrectChars) / (typedChars || 1)) * 100,
    [typedChars, incorrectChars]
  );

  const isTyping = isStarted && typedChars > 0;
  const isTimeup = isTimeMode ? isTyping && count <= 0 : isEndOfParagraph;

  const startTyping = useCallback(() => {
    setIsStarted(true);
    inputRef.current?.focus();
  }, [inputRef]);

  const handleEnd = useCallback(() => {
    // Prepare record info
    const isFirstRecord = !userInfo.wpm;
    const isNewBestRecord = !isFirstRecord && (userInfo.bestInfo?.[difficulty]?.wpm || 0) < wpm;
    const recordType = isFirstRecord
      ? ERecoreType.BASELINE
      : isNewBestRecord
        ? ERecoreType.BEST
        : ERecoreType.NORMAL;
    const recordedTimestamp = Date.now();
    const signature = CryptoJS.HmacSHA256(
      `${wpm}_${Math.round(accuracy)}_${isTimeMode ? duration : count}_${recordedTimestamp}`,
      RESULT_PAGE_KEY
    ).toString();

    const saveNewRecord = () => {
      const result: TResult = {
        wpm,
        accuracy: Math.round(accuracy),
        duration: isTimeMode ? duration : count.toString(),
        recordedTimestamp,
        correctChars: typedChars - incorrectChars,
        incorrectChars,
        signature,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef, navigate, wpm, accuracy, duration, difficulty, isTimeMode, count]);

  useEffect(() => {
    if (isTyping && typedChars === 1) {
      startCountdown();
      dispatch?.({ type: 'startTyping' });
    }
  }, [isTyping, typedChars, startCountdown, dispatch]);

  useEffect(() => {
    if (isTimeup || isEndOfParagraph) {
      handleEnd();
    }
  }, [isTimeup, isEndOfParagraph, handleEnd]);

  useEffect(() => {
    resetCountdown();
  }, [duration, resetCountdown, isTimeMode]);

  return {
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
  };
};
