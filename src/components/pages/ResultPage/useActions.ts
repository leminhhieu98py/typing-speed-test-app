import { ERecoreType, type TUserInfo } from '@/types/common';
import { fireFireworks, fireNormalConfetti } from '@/utils/confettiUtils';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const MESSAGE_MAPPING: Record<ERecoreType, Record<'title' | 'description', string>> = {
  [ERecoreType.BASELINE]: {
    title: 'Baseline Established 🎉',
    description: 'You’ve set the bar. Now the real challenge begins — time to beat it.',
  },
  [ERecoreType.BEST]: {
    title: 'High Score Smashed 🎉',
    description: 'You’re getting faster. That was incredible typing.',
  },
  [ERecoreType.NORMAL]: {
    title: 'Test Complete',
    description: 'Solid run. Keep pushing to beat your high score.',
  },
  [ERecoreType.LAST_RESULT]: {
    title: 'Last Result',
    description: 'Solid run. Keep pushing to beat your high score.',
  },
};

export const useActions = () => {
  const { from, recordType: paramRecordType }: { from?: string; recordType?: ERecoreType } =
    useSearch({
      from: '/result',
    });
  const [recordType] = useState(paramRecordType);
  const [userInfo] = useLocalStorage<TUserInfo>('typing-speed-test-user-info', {});

  const navigate = useNavigate();
  const title = recordType
    ? MESSAGE_MAPPING[recordType].title
    : MESSAGE_MAPPING[ERecoreType.LAST_RESULT].title;
  const description = recordType
    ? MESSAGE_MAPPING[recordType].description
    : MESSAGE_MAPPING[ERecoreType.LAST_RESULT].description;

  const handleStartNewTest = () => {
    navigate({
      to: '/',
    });
  };

  const handleShareResult = () => {
    // TODO: implement share result functionality
    console.log('handleShareResult');
  };

  useEffect(() => {
    if (from === 'homepage') {
      if (paramRecordType === ERecoreType.NORMAL) {
        fireNormalConfetti();
      } else {
        fireFireworks();
      }
      navigate({
        to: '/result',
        replace: true,
      });
    }
  }, [from, paramRecordType, navigate]);

  return { title, description, handleStartNewTest, handleShareResult, userInfo };
};
