import { ERecoreType } from '@/types/common';
import { fireFireworks, fireNormalConfetti } from '@/utils/confettiUtils';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { useEffect, useState } from 'react';

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
};

export const useActions = () => {
  const { from, recordType: paramRecordType }: { from?: string; recordType?: ERecoreType } =
    useSearch({
      from: '/result',
    });
  const [recordType] = useState(paramRecordType);

  const navigate = useNavigate();
  const title = recordType
    ? MESSAGE_MAPPING[recordType].title
    : MESSAGE_MAPPING[ERecoreType.NORMAL].title;
  const description = recordType
    ? MESSAGE_MAPPING[recordType].description
    : MESSAGE_MAPPING[ERecoreType.NORMAL].description;

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

  return { title, description, handleStartNewTest, handleShareResult };
};
