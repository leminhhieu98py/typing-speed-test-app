import { useNotification } from '@/components/common/NotificationDisplay/useNotification';
import { ERecoreType, type TUserInfo } from '@/types/common';
import { fireFireworks, fireNormalConfetti } from '@/utils/confettiUtils';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { useEffect, useState } from 'react';
import { useCopyToClipboard, useDebounceCallback, useLocalStorage } from 'usehooks-ts';
import CryptoJS from 'crypto-js';
import { RESULT_PAGE_KEY } from '@/constants';

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

const verifyPayload = (
  payload?: string
): { isValid: false; data: undefined } | { isValid: true; data: TUserInfo } => {
  if (!payload) return { isValid: false, data: undefined };

  const payloadObj: TUserInfo = JSON.parse(atob(payload));
  const { wpm, accuracy, duration, recordedTimestamp } = payloadObj;

  const expectedSignature = CryptoJS.HmacSHA256(
    `${wpm}_${accuracy}_${duration}_${recordedTimestamp}`,
    RESULT_PAGE_KEY
  ).toString();

  if (payloadObj.signature === expectedSignature) {
    return { isValid: true, data: payloadObj };
  }

  return { isValid: false, data: undefined };
};

const getShareURL = ({
  userInfo,
  recordType,
}: {
  userInfo: TUserInfo;
  recordType?: ERecoreType;
}): string => {
  if (!userInfo.signature) return '';

  const transferData: TUserInfo = {
    ...userInfo,
    bestInfo: undefined,
  };
  const dataString = JSON.stringify(transferData);

  const payload = btoa(dataString);
  const paramsString = `from=homepage&recordType=${recordType || ''}&p=${payload}`;
  const shareUrl = `${location.href}?${paramsString}`;

  return shareUrl;
};

export const useActions = () => {
  const {
    from,
    recordType: paramRecordType,
    p: sharePayload,
  }: { from?: string; recordType?: ERecoreType; p?: string } = useSearch({
    from: '/result',
  });
  const [recordType] = useState(paramRecordType);
  const [userInfo] = useLocalStorage<TUserInfo>('typing-speed-test-user-info', {});
  const [userInfoFromShareResult] = useState(verifyPayload(sharePayload));
  const [, copy] = useCopyToClipboard();
  const { notis, showNoti, removeNoti } = useNotification();
  const isValidShareData = userInfoFromShareResult.isValid;
  const _userInfo = isValidShareData ? userInfoFromShareResult.data : userInfo;

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

  const handleShareResult = useDebounceCallback(() => {
    if (isValidShareData) return;

    const shareUrl = getShareURL({ userInfo, recordType });
    copy(shareUrl).then(() => {
      showNoti('Shared link is copied, share with your friends now.');
    });
  }, 300);

  useEffect(() => {
    if (from === 'homepage') {
      if (paramRecordType === ERecoreType.NORMAL || paramRecordType === ERecoreType.LAST_RESULT) {
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

  return {
    title,
    description,
    handleStartNewTest,
    handleShareResult,
    userInfo: _userInfo,
    isValidShareData,
    notis,
    removeNoti,
  };
};
